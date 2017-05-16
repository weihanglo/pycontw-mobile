import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'

import {default as Item} from './CategoryItem'

Category.propTypes = {
  category: PropTypes.string,
  language: PropTypes.string,
  level: PropTypes.string,
  recording: PropTypes.bool,
  style: PropTypes.any
}

function mapLanguage (language, isTag = false) {
  switch (language) {
    case 'ZHZH':
      return isTag ? 'ZH' : 'Chinese talk & slides'
    case 'ZHEN':
      return isTag ? 'ZE' : 'Chinese talk w/ English slides'
    case 'ENZH':
      return isTag ? 'EZ' : 'English talk w/ Chinese slides'
    case 'ENEN':
      return isTag ? 'EN' : 'English talk & slides'
  }
}

function mapLevel (level, isTag = false) {
  switch (level) {
    case 'NOVICE':
      return isTag ? '-' : 'Novice'
    case 'INTERMEDIATE':
      return isTag ? '=' : 'Intermediate'
    case 'EXPERIENCED':
      return isTag ? '≡' : 'Experienced'
  }
}

export default function Category ({
    style, category, language: lang, level, recording, ...props
  }) {
  return (
    <View style={[{flex: 1}, style]} {...props}>
      {category && <Item icon='tag' text={category} />}
      {lang && <Item tag={mapLanguage(lang, true)} text={mapLanguage(lang)} /> }
      {level && <Item tag={mapLevel(level, true)} text={mapLevel(level)} />}
      {recording || <Item icon='microphone-slash' text='No recording' />}
    </View>
  )
}
