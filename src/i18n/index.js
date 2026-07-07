import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import hy from './locales/hy.json';
import ru from './locales/ru.json';
import en from './locales/en.json';

i18n.translations = { hy, ru, en };
i18n.locale = Localization.locale;
i18n.fallbacks = true;
i18n.defaultLocale = 'en';

export const initI18n = () => {
  const locale = Localization.locale;
  i18n.locale = locale;
};

export const t = (key, params = {}) => {
  return i18n.t(key, params);
};

export const changeLanguage = (lang) => {
  i18n.locale = lang;
};

export default i18n;
