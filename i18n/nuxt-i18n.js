import { createI18n } from "vue-i18n";
import en from "~/locales/en.json";
import zh from "~/locales/zh.json";
import pt from "~/locales/pt.json";
import de from "~/locales/de.json";
import fr from "~/locales/fr.json";
import es from "~/locales/es.json";
import jp from "~/locales/jp.json";
import ko from "~/locales/ko.json";

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    zh,
    pt,
    de,
    fr,
    es,
    jp,
    ko,
  },
  silentTranslationWarn: true,
  numberFormats: {
    en: {
      currency: {
        style: "currency",
        currency: "USD",
        notation: "standard",
      },
    },
    zh: {
      currency: {
        style: "currency",
        currency: "CNY",
        notation: "standard",
      },
    },
    jp: {
      currency: {
        style: "currency",
        currency: "JPY",
        notation: "standard",
      },
    },
  },
  datetimeFormats: {
    en: {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    },
    zh: {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    },
  },
});
