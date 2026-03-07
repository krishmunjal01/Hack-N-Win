import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import hiTranslation from './locales/hi/translation.json';
import bnTranslation from './locales/bn/translation.json';
import teTranslation from './locales/te/translation.json';
import mrTranslation from './locales/mr/translation.json';
import taTranslation from './locales/ta/translation.json';
import urTranslation from './locales/ur/translation.json';
import guTranslation from './locales/gu/translation.json';
import knTranslation from './locales/kn/translation.json';
import orTranslation from './locales/or/translation.json';
import mlTranslation from './locales/ml/translation.json';
import paTranslation from './locales/pa/translation.json';

const resources = {
  en: { translation: enTranslation },
  hi: { translation: hiTranslation },
  bn: { translation: bnTranslation },
  te: { translation: teTranslation },
  mr: { translation: mrTranslation },
  ta: { translation: taTranslation },
  ur: { translation: urTranslation },
  gu: { translation: guTranslation },
  kn: { translation: knTranslation },
  or: { translation: orTranslation },
  ml: { translation: mlTranslation },
  pa: { translation: paTranslation }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
