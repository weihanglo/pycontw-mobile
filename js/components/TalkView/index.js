import React from 'react'
import PropTypes from 'prop-types'
import {ScrollView, StyleSheet, View} from 'react-native'

import {Text, Heading1, Paragraph} from '../../common/PyText'
import * as Colors from '../../common/PyColors'
import Category from './Category'
import TalkAvatar from './TalkAvatar'

export default class extends React.Component {
  static propTypes = {
    talk: PropTypes.objectOf(PropTypes.shape()).isRequired,
    location: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired
  }

  render () {
    const {
      abstract, category, language, speakers, title,
      python_level: level,
      recording_policy: recording,
      detailed_description: detail
    } = this.props.talk

    // FIXME: temporary given value
    const {location = 'R0', duration = '20 MIN'} = this.props

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={{marginTop: 3}}>
            <Text style={{color: Colors.colorForLocation(location)}}>
              {location}
            </Text>
            {' - '}
            <Text>{duration}</Text>
          </Text>
          <Heading1 style={styles.title}>{title}</Heading1>

          <TalkAvatar style={styles.avatarSection} speakers={speakers} />
          <View style={styles.category}>
            <Category
              style={{flex: 1}}
              category={category}
              language={language}
              level={level}
              recording={recording}
            />
          </View>
          <Paragraph style={styles.abstract}>{abstract}</Paragraph>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.BACKGROUND,
    flex: 1
  },
  scrollContainer: {
    padding: 20
  },
  title: {
    color: Colors.secondary.FOREGROUND,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 12
  },
  avatarSetion: {
    paddingVertical: 8,
    paddingHorizontal: '10%'
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8
  },
  abstract: {
    textAlign: 'justify'
  }
})
