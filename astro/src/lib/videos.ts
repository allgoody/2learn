import raw from "../../../content/videos.json";

export interface Video {
  videoId: string;
  title: string;
  channel: string;
  description: string;
  added: string;
}

// The data file lives at the repository root, outside `lessons/`, because the corpus forbids
// external URLs in its own tree. `npm run check` does not validate its shape:
// `node tools/check-videos.mjs` does.
const data = raw as Record<string, Video[]>;

/** The videos for an entry, in display order. Empty for an unknown id, so a page never breaks. */
export const videosFor = (entryId: string): Video[] => data[entryId] ?? [];

/** The only place either URL is built. The stored value is the id, never a URL. */
export const watchUrl = (videoId: string): string =>
  `https://www.youtube.com/watch?v=${videoId}`;

export const thumbUrl = (videoId: string): string => `/videos/${videoId}.jpg`;
