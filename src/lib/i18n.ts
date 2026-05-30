import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from '../locales/en/translation.json';
import frTranslation from '../locales/fr/translation.json';
import esTranslation from '../locales/es/translation.json';
import deTranslation from '../locales/de/translation.json';
import arTranslation from '../locales/ar/translation.json';
import ptTranslation from '../locales/pt/translation.json';
import itTranslation from '../locales/it/translation.json';
import nlTranslation from '../locales/nl/translation.json';
import ruTranslation from '../locales/ru/translation.json';
import zhTranslation from '../locales/zh/translation.json';
import jaTranslation from '../locales/ja/translation.json';
import koTranslation from '../locales/ko/translation.json';
import trTranslation from '../locales/tr/translation.json';
import hiTranslation from '../locales/hi/translation.json';
import idTranslation from '../locales/id/translation.json';
import viTranslation from '../locales/vi/translation.json';
import plTranslation from '../locales/pl/translation.json';
import svTranslation from '../locales/sv/translation.json';

const resources = {
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
  es: { translation: esTranslation },
  de: { translation: deTranslation },
  ar: { translation: arTranslation },
  pt: { translation: ptTranslation },
  it: { translation: itTranslation },
  nl: { translation: nlTranslation },
  ru: { translation: ruTranslation },
  zh: { translation: zhTranslation },
  ja: { translation: jaTranslation },
  ko: { translation: koTranslation },
  tr: { translation: trTranslation },
  hi: { translation: hiTranslation },
  id: { translation: idTranslation },
  vi: { translation: viTranslation },
  pl: { translation: plTranslation },
  sv: { translation: svTranslation },
};

// Detect user language
const detectedLanguage = (() => {
  // First check localStorage for user preference
  const stored = localStorage.getItem('i18n_language');
  if (stored) return stored;

  // Then use browser detection
  const browserLang = navigator.language?.split('-')[0] || 'en';
  const supportedLanguages = Object.keys(resources);
  return supportedLanguages.includes(browserLang) ? browserLang : 'en';
})();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: detectedLanguage,
    interpolation: {
      escapeValue: false, // React already prevents XSS
    },
    defaultNS: 'translation',
    ns: ['translation'],
    react: {
      useSuspense: false,
    },
  });

// Persist language preference
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18n_language', lng);
});

export default i18n;
