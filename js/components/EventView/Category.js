import React from 'react'
import PropTypes from 'prop-types'
import {View, ViewPropTypes} from 'react-native'

import Item from './CategoryItem'
import categoryMapping from '../../i18n/categoryMapping'
import I18n from '../../i18n'

Category.propTypes = {
  category: PropTypes.string,
  language: PropTypes.string,
  level: PropTypes.string,
  recording: PropTypes.bool,
  slideLink: PropTypes.string,
  style: ViewPropTypes.style
}

function mapLanguage (language, isTag = false) {
  switch (language) {
    case 'ZHZH':
      return isTag ? 'ZH' : I18n.t('Chinese talk & slides')
    case 'ZHEN':
      return isTag ? 'ZE' : I18n.t('Chinese talk w/ English slides')
    case 'ENZH':
      return isTag ? 'EZ' : I18n.t('English talk w/ Chinese slides')
    case 'ENEN':
      return isTag ? 'EN' : I18n.t('English talk & slides')
  }
}

function mapLevel (level, isTag = false) {
  switch (level) {
    case 'NOVICE':
      return isTag ? '-' : I18n.t('Novice')
    case 'INTERMEDIATE':
      return isTag ? '=' : I18n.t('Intermediate')
    case 'EXPERIENCED':
      return isTag ? '≡' : I18n.t('Experienced')
  }
}

export default function Category ({
    category,
    language,
    level,
    recording,
    slideLink,
    style,
    ...props
  }) {
  return (
    <View style={[{flex: 1}, style]} {...props}>
      {category.length === 0 ||
        <Item icon='tag' text={categoryMapping[category]} />
      }

      {language.length === 0 ||
        <Item tag={mapLanguage(language, true)} text={mapLanguage(language)} />
      }

      {level.length === 0 ||
        <Item tag={mapLevel(level, true)} text={mapLevel(level)} />
      }

      {recording || <Item icon='microphone-off' text='No recording' />}

      {slideLink.length === 0 ||
        <Item icon='presentation' text={slideLink} isLink />
      }
    </View>
  )
}
