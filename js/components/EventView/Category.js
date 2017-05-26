import React from 'react'
import PropTypes from 'prop-types'
import {View, ViewPropTypes} from 'react-native'

import Item from './CategoryItem'

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
      {category && <Item icon='tag' text={category} />}
      {language &&
        <Item tag={mapLanguage(language, true)} text={mapLanguage(language)} />
      }
      {level && <Item tag={mapLevel(level, true)} text={mapLevel(level)} />}
      {recording || <Item icon='microphone-off' text='No recording' />}
      {slideLink && <Item icon='presentation' text={slideLink} />}
    </View>
  )
}
