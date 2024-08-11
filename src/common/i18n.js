import {I18n} from 'i18n-js';
import memoize from 'lodash.memoize';
import * as RNLocalize from 'react-native-localize';
import {I18nManager} from 'react-native';

const translationGetters = {
  en: require('../translations/en.json'),
  he: require('../translations/he.json'),
};
export let i18n = new I18n(translationGetters);
console.log('🚀 ~ i18n:', i18n);

i18n.defaultLocale = 'en';
i18n.locale = 'en';

// console.log('i18n:', i18n);

// Memoize translation function
const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = () => {
  // Fallback language if no available language fits
  const fallback = {languageTag: 'en', isRTL: false};

  // Ensure RNLocalize is available and functioning
  const {languageTag, isRTL} = RNLocalize.findBestLanguageTag
    ? RNLocalize.findBestLanguageTag(Object.keys(translationGetters)) ||
      fallback
    : fallback;

  // Initialize i18n if not already done
  if (!i18n || typeof i18n !== 'object') {
    console.error('i18n is not initialized or is not an object');
    return;
  }

  // Clear translation cache
  translate.cache.clear();

  // Update layout direction
  I18nManager.forceRTL(isRTL);

  // Safeguard against undefined translations property
  if (typeof i18n.translations === 'object') {
    i18n.translations = {[languageTag]: translationGetters[languageTag]};
    i18n.locale = languageTag;
  } else {
    console.error('i18n.translations is not defined or is not an object');
  }
};
