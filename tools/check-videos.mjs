#!/usr/bin/env node
// Structural and liveness checks for content/videos.json — the YouTube references for corpus
// entries. Plain Node ESM, no dependencies, like the other tools here.
//
//   node tools/check-videos.mjs                structural, offline; exit 1 on any problem
//   node tools/check-videos.mjs --online       liveness report; always exits 0
//   node tools/check-videos.mjs --add <url>    ingest one video
//   node tools/check-videos.mjs --file <path>  any mode against another data file
//
// The site never hotlinks a thumbnail, so this tool downloads one copy into astro/public/videos/.

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

// Resolved from this file, never from the working directory.
const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_FILE = join(REPO_ROOT, "content", "videos.json");
const INVENTORY = join(REPO_ROOT, "tools", "inventory.json");
const LESSONS_DIR = join(REPO_ROOT, "lessons");
const THUMBNAIL_DIR = join(REPO_ROOT, "astro", "public", "videos");

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const MIN_THUMBNAIL_BYTES = 5120;

const HELP = `Usage: node tools/check-videos.mjs [--file <path>] [mode]

Modes:
  (default)      Validate content/videos.json offline. Reports every problem, one per line,
                 and exits 1 if there is any.
  --online       Probe every distinct video id against YouTube's oEmbed endpoint and report
                 each as live or not-found. Always exits 0: a deleted video must never fail
                 a deploy, so this reports and the operator decides.
  --add <url>    Ingest one video. Accepts youtu.be/ID, /watch?v=ID, /shorts/ID and playlist
                 URLs. Downloads the thumbnail into astro/public/videos/<id>.jpg and prints
                 a JSON snippet with a placeholder description to replace.
  --help         This text.

Options:
  --file <path>  Read another data file instead of content/videos.json.
`;

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

/** Every corpus entry id: from the inventory, plus a walk of lessons/ in case it lags behind. */
const knownIds = () => {
  const ids = new Set();
  try {
    for (const entry of JSON.parse(readFileSync(INVENTORY, "utf8"))) {
      if (typeof entry?.id === "string") ids.add(entry.id);
    }
  } catch (error) {
    // The walk below still gives every id, so a damaged inventory is a warning, not a failure.
    console.error(`could not read ${relative(REPO_ROOT, INVENTORY)}: ${error.message}`);
  }
  // `lessons/ru` mirrors `lessons/` path for path, so its ids would be prefixed with "ru".
  const walk = (dir) => {
    for (const item of readdirSync(dir, { withFileTypes: true })) {
      if (!item.isDirectory()) continue;
      if (dir === LESSONS_DIR && item.name === "ru") continue;
      const full = join(dir, item.name);
      if (existsSync(join(full, "index.md"))) {
        ids.add(relative(LESSONS_DIR, full).split(sep).join("/"));
      }
      walk(full);
    }
  };
  walk(LESSONS_DIR);
  return ids;
};

/** Report every structural problem in the data. Returns the list of problem lines. */
const structuralProblems = (data) => {
  const problems = [];
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    return ["the data file must be an object keyed by corpus entry id"];
  }

  const ids = knownIds();
  for (const [entryId, videos] of Object.entries(data)) {
    if (!ids.has(entryId)) {
      problems.push(`${entryId}: not a corpus entry id`);
    }
    if (!Array.isArray(videos)) {
      problems.push(`${entryId}: must be an array of videos`);
      continue;
    }
    videos.forEach((video, index) => {
      const where = `${entryId}[${index}]`;
      if (video === null || typeof video !== "object" || Array.isArray(video)) {
        problems.push(`${where}: must be an object`);
        return;
      }
      if (typeof video.videoId !== "string" || !VIDEO_ID.test(video.videoId)) {
        problems.push(`${where}.videoId: ${JSON.stringify(video.videoId)} is not 11 url-safe characters`);
      }
      const text = (field, max) => {
        const value = video[field];
        if (typeof value !== "string" || value.trim() === "") {
          problems.push(`${where}.${field}: must be a non-empty string`);
        } else if (value.length > max) {
          problems.push(`${where}.${field}: ${value.length} characters, at most ${max} allowed`);
        }
      };
      text("title", 200);
      text("channel", 200);
      text("description", 300);
      if (typeof video.added !== "string" || !DATE.test(video.added)) {
        problems.push(`${where}.added: ${JSON.stringify(video.added)} is not YYYY-MM-DD`);
      }
    });
  }
  return problems;
};

/** The id from any of the shapes a YouTube link arrives in. */
const videoIdFromUrl = (input) => {
  let url;
  try {
    url = new URL(input);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\./, "").replace(/^m\./, "");
  if (host === "youtu.be") {
    return url.pathname.slice(1).split("/")[0] || null;
  }
  if (host !== "youtube.com") return null;
  const direct = url.searchParams.get("v");
  if (direct) return direct;
  const nested = url.pathname.match(/^\/(?:shorts|embed|live)\/([^/?#]+)/);
  return nested ? nested[1] : null;
};

const oembed = async (videoId) => {
  const endpoint = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  const response = await fetch(endpoint);
  if (!response.ok) return null;
  return await response.json();
};

// maxresdefault.jpg is absent for many videos: ytimg returns HTTP 200 with a ~1KB 120x90 grey placeholder, so file size, not status, is the test.
const downloadThumbnail = async (videoId) => {
  for (const name of ["maxresdefault", "mqdefault"]) {
    const response = await fetch(`https://i.ytimg.com/vi/${videoId}/${name}.jpg`);
    if (!response.ok) continue;
    const bytes = Buffer.from(await response.arrayBuffer());
    if (name === "maxresdefault" && bytes.length < MIN_THUMBNAIL_BYTES) continue;
    return { name, bytes };
  }
  return null;
};

const readData = (file) => {
  if (!existsSync(file)) {
    console.error(`${file} does not exist`);
    process.exitCode = 1;
    return undefined;
  }
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    console.error(`${file} is not valid JSON: ${error.message}`);
    process.exitCode = 1;
    return undefined;
  }
};

const distinctVideoIds = (data) => {
  const ids = new Set();
  for (const videos of Object.values(data ?? {})) {
    if (!Array.isArray(videos)) continue;
    for (const video of videos) {
      if (typeof video?.videoId === "string") ids.add(video.videoId);
    }
  }
  return [...ids];
};

const runStructural = (file) => {
  const data = readData(file);
  if (data === undefined) return;
  const problems = structuralProblems(data);
  const videos = Object.values(data).reduce(
    (total, list) => total + (Array.isArray(list) ? list.length : 0),
    0,
  );
  for (const problem of problems) console.log(problem);
  if (problems.length > 0) {
    console.log(`${problems.length} problem(s)`);
    process.exitCode = 1;
    return;
  }
  console.log(`${videos} videos across ${Object.keys(data).length} entries, 0 problems`);
};

const runOnline = async (file) => {
  const data = readData(file);
  if (data === undefined) return;
  const ids = distinctVideoIds(data);
  if (ids.length === 0) {
    console.log("no videos to check");
    return;
  }
  let live = 0;
  for (const [index, videoId] of ids.entries()) {
    if (index > 0) await sleep(300);
    const meta = await oembed(videoId);
    if (meta) {
      live += 1;
      console.log(`live     ${videoId}  ${meta.title} — ${meta.author_name}`);
    } else {
      console.log(`not-found ${videoId}`);
    }
  }
  // Deliberately no non-zero exit: a deleted video must not break a deploy.
  console.log(`${live} of ${ids.length} live`);
};

const runAdd = async (input) => {
  const videoId = videoIdFromUrl(input);
  if (!videoId || !VIDEO_ID.test(videoId)) {
    console.error(`could not read a video id out of ${JSON.stringify(input)}`);
    process.exitCode = 1;
    return;
  }

  const meta = await oembed(videoId);
  if (!meta) {
    console.error(`${videoId} is not reachable through oEmbed — deleted, private, or not a video`);
    process.exitCode = 1;
    return;
  }

  const thumbnail = await downloadThumbnail(videoId);
  if (!thumbnail) {
    console.error(`no thumbnail available for ${videoId}`);
    process.exitCode = 1;
    return;
  }
  mkdirSync(THUMBNAIL_DIR, { recursive: true });
  const target = join(THUMBNAIL_DIR, `${videoId}.jpg`);
  writeFileSync(target, thumbnail.bytes);

  const snippet = {
    videoId,
    title: meta.title,
    channel: meta.author_name,
    description: "REPLACE ME: one sentence on what the video covers.",
    added: new Date().toISOString().slice(0, 10),
  };
  console.log(`thumbnail: ${thumbnail.name}.jpg (${Math.round(thumbnail.bytes.length / 1024)} KB)`);
  console.log(`saved to:  ${relative(REPO_ROOT, target).split(sep).join("/")}`);
  console.log("paste under the entry id in content/videos.json:");
  console.log(JSON.stringify(snippet, null, 2));
};

const main = async () => {
  const args = process.argv.slice(2);
  if (args.includes("--help")) {
    console.log(HELP);
    return;
  }

  const fileIndex = args.indexOf("--file");
  if (fileIndex !== -1 && !args[fileIndex + 1]) {
    console.error("--file needs a path");
    process.exitCode = 1;
    return;
  }
  const file = fileIndex === -1 ? DEFAULT_FILE : resolve(args[fileIndex + 1]);

  const addIndex = args.indexOf("--add");
  if (addIndex !== -1) {
    const url = args[addIndex + 1];
    if (!url) {
      console.error("--add needs a URL");
      process.exitCode = 1;
      return;
    }
    await runAdd(url);
    return;
  }

  if (args.includes("--online")) {
    await runOnline(file);
    return;
  }

  runStructural(file);
};

await main();
