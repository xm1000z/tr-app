import { SpeakingState } from "@/interfaces";

export const enum ToolBeltType {
  TEXT = "text",
  IMAGE = "image",
  DOCUMENT = "document",
  WEB_SITE = "web-site",
  CODE = "code",
}

export const validToolBeltTypes = [
  ToolBeltType.TEXT,
  ToolBeltType.IMAGE,
  ToolBeltType.DOCUMENT,
  ToolBeltType.WEB_SITE,
  ToolBeltType.CODE,
];

export const DEFAULT_FROM_QUERY_LANGUAGE = "auto";
export const DEFAULT_TO_QUERY_LANGUAGE = "en";

interface Language {
  value: string;
  label: string;
  lang: string;
  query: string;
}

export const languages: Language[] = [
  { value: "Auto", label: "Auto", lang: "auto", query: "auto" },
  { value: "Español", label: "Español", lang: "es-ES", query: "es" },
  { value: "Inglés", label: "Inglés", lang: "en-US", query: "en" },
  { value: "Catalán", label: "Catalán", lang: "cat-cat", query: "cat" },
  { value: "Alemán", label: "Alemán", lang: "de-DE", query: "de" },
  { value: "Árabe", label: "Árabe", lang: "ar-SA", query: "ar" },
  { value: "Bengalí", label: "Bengalí", lang: "bn-IN", query: "bn" },
  { value: "Francés", label: "Francés", lang: "fr-FR", query: "fr" },
  { value: "Hindi", label: "Hindi", lang: "hi-IN", query: "hi" },
  { value: "Japonés", label: "Japonés", lang: "ja-JP", query: "ja" },
  { value: "Mandarín", label: "Mandarín", lang: "zh-CN", query: "zh" },
  { value: "Portugués", label: "Portugués", lang: "pt-BR", query: "pt" },
  { value: "Ruso", label: "Ruso", lang: "ru-RU", query: "ru" },
];

export const querylanguages: string[] = languages.map(({ query }) => query);

export const languageByValue: Record<string, Language> = languages.reduce(
  (acc, language) => ({
    ...acc,
    [language.value]: language,
  }),
  {}
);

export const languageByQueryLanguage: Record<string, Language> =
  languages.reduce(
    (acc, language) => ({
      ...acc,
      [language.query]: language,
    }),
    {}
  );

export const DEFAULT_LANG = "es-ES";

export const DEBOUNCE_TIME = 300;

export const enum TranslationBoxTypes {
  SOURCE = "source",
  TARGET = "target",
}

export const MIN_TEXT_TO_TRANSLATE_LENGTH = 2;
export const MAX_TEXT_TO_TRANSLATE_LENGTH = 5000;

export const MAX_CODE_TO_TRANSLATE_LENGTH = 10000;
export const MIN_CODE_TO_TRANSLATE_LENGTH = 10;

export const defaultSpeakingState: SpeakingState = {
  isSpeaking: false,
  type: TranslationBoxTypes.SOURCE,
};

export const DEFAULT_TOOLTIP_DELAY_DURATION = 600;

export const enum SearchParams {
  FROM_LANGUAGE = "sl",
  TO_LANGUAGE = "tl",
  OPTION = "op",
  TEXT = "text",
  CODE = "code",
}

export const validPrefixes = [
  "data:application/pdf;base64,",
  "data:@file/pdf;base64,",
];