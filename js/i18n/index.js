import I18n from 'react-native-i18n'

import en from './locales/en'
import zhTW from './locales/zh-TW'

// We use the scope as the translations
I18n.missingTranslation = scope => scope

I18n.fallbacks = true

I18n.translations = {
  en,
  zh: zhTW,
  'zh-TW': zhTW,
  'zh-Hant': zhTW,
  'zh-Hant-US': zhTW
}

export default I18n
