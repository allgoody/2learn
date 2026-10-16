import type { Locale } from "./corpus";

// Every label the site authors, in both locales. Plain strings only — no markup.
//
// The Russian block is typed as the English one, and that is the symmetry
// guard: a key in one block and not the other is a type error, so a label can
// never silently go missing. That is why `en` is *not* `as const` — literal
// value types would make every Russian label a type error as well.
const en = {
  siteName: "2learn",
  siteTagline: "A bilingual lesson corpus",
  homeTitle: "Free lessons in programming, design and product",
  skipToContent: "Skip to content",
  navLabel: "Main navigation",
  navHome: "Home",
  navTopics: "Topics",
  navEntries: "All entries",
  navSearch: "Search",
  navAbout: "About",
  navPrivacy: "Privacy",
  menuOpen: "Open navigation menu",
  menuClose: "Close navigation menu",
  themeToggle: "Colour theme",
  themeToLight: "Switch to the light theme",
  themeToDark: "Switch to the dark theme",
  backToTop: "Back to top",
  tocTitle: "On this page",
  onThisPage: "On this page",
  prevLabel: "Previous",
  nextLabel: "Next",
  prereqsTitle: "Prerequisites",
  relatedTitle: "Related entries",
  watchTitle: "Watch",
  watchNewTab: "opens YouTube in a new tab",
  examplesTitle: "Examples",
  examplesLink: "Worked examples",
  entriesTitle: "All entries",
  entriesIntro:
    "Every recorded lesson in the corpus, in learning order. Filter by topic, tier or type.",
  filterTopic: "Topic",
  filterTier: "Tier",
  filterType: "Type",
  filterAll: "All",
  aboutTitle: "About",
  aboutWhatTitle: "What is in it",
  aboutReadTitle: "How to read it",
  aboutLanguagesTitle: "Two languages",
  glossaryTitle: "Glossary",
  notFoundTitle: "Page not found",
  notFoundBody:
    "There is no page at this address. It may have been renamed or never existed.",
  notFoundHome: "Go to the home page",
  langSwitch: "Switch to Russian",
  searchTitle: "Search",
  searchPlaceholder: "Search the corpus",
  searchBuiltOnly: "Search works on the built site only.",
  consentTitle: "Cookies and analytics",
  consentBody:
    "Analytics cookies are set only if you allow them. Nothing is loaded, and nothing is sent, until you choose.",
  consentAccept: "Allow analytics",
  consentDecline: "No thanks",
  consentChange: "Change your choice",
  footerTopics: "Topics",
  footerRights: "2learn — a bilingual lesson corpus",
};

const ru: typeof en = {
  siteName: "2learn",
  siteTagline: "Двуязычный корпус уроков",
  homeTitle: "Бесплатные уроки по программированию, дизайну и продукту",
  skipToContent: "Перейти к содержимому",
  navLabel: "Основная навигация",
  navHome: "Главная",
  navTopics: "Разделы",
  navEntries: "Все записи",
  navSearch: "Поиск",
  navAbout: "О проекте",
  navPrivacy: "Приватность",
  menuOpen: "Открыть меню навигации",
  menuClose: "Закрыть меню навигации",
  themeToggle: "Цветовая тема",
  themeToLight: "Переключить на светлую тему",
  themeToDark: "Переключить на тёмную тему",
  backToTop: "Наверх",
  tocTitle: "На этой странице",
  onThisPage: "На этой странице",
  prevLabel: "Назад",
  nextLabel: "Вперёд",
  prereqsTitle: "Предварительные требования",
  relatedTitle: "Связанные записи",
  watchTitle: "Видео",
  watchNewTab: "откроется на YouTube в новой вкладке",
  examplesTitle: "Примеры",
  examplesLink: "Разобранные примеры",
  entriesTitle: "Все записи",
  entriesIntro:
    "Все уроки корпуса в порядке изучения. Фильтр по разделу, уровню и типу.",
  filterTopic: "Раздел",
  filterTier: "Уровень",
  filterType: "Тип",
  filterAll: "Все",
  aboutTitle: "О проекте",
  aboutWhatTitle: "Что внутри",
  aboutReadTitle: "Как читать",
  aboutLanguagesTitle: "Два языка",
  glossaryTitle: "Глоссарий",
  notFoundTitle: "Страница не найдена",
  notFoundBody:
    "По этому адресу страницы нет. Возможно, она была переименована или никогда не существовала.",
  notFoundHome: "Перейти на главную",
  langSwitch: "Переключить на английский",
  searchTitle: "Поиск",
  searchPlaceholder: "Поиск по корпусу",
  searchBuiltOnly: "Поиск работает только на собранном сайте.",
  consentTitle: "Файлы cookie и аналитика",
  consentBody:
    "Файлы cookie аналитики ставятся только с вашего согласия. До вашего выбора ничего не загружается и никуда не отправляется.",
  consentAccept: "Разрешить аналитику",
  consentDecline: "Не надо",
  consentChange: "Изменить выбор",
  footerTopics: "Разделы",
  footerRights: "2learn — двуязычный корпус уроков",
};

export type Dict = typeof en;

export function getDict(locale: Locale): Dict {
  return locale === "ru" ? ru : en;
}
