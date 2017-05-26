import React from 'react'
import PropTypes from 'prop-types'
import {ScrollView, StyleSheet, View, ViewPropTypes} from 'react-native'

import {Text, Heading1, Paragraph} from '../../common/PyText'
import * as Colors from '../../common/PyColors'
import Category from './Category'
import Avatar from './EventAvatar'

export default class extends React.Component {
  static propTypes = {
    eventId: PropTypes.string,
    event: PropTypes.object,
    error: PropTypes.object,
    isFetching: PropTypes.bool,
    // location: PropTypes.string.isRequired,
    // duration: PropTypes.string.isRequired,
    style: ViewPropTypes.style,
  }

  render () {
    const {
      eventId,
      event,
      error,
      isFetching,
      style,
    } = this.props
    // const {
    //   abstract, category, language, speakers, title,
    //   python_level: level,
    //   recording_policy: recording,
    //   detailed_description: detail
    // } = this.props.talk

    // FIXME: temporary given value
    const location = 'R0'
    const duration = '20 MIN'

    if (isFetching) {
      return (
        <View sytle={[styles.container]}>
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {/* <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={{marginTop: 3}}>
            <Text style={{color: Colors.colorForLocation(location)}}>
              {location}
            </Text>
            {' - '}
            <Text>{duration}</Text>
          </Text>
          <Heading1 style={styles.title}>{title}</Heading1>

          <Avatar style={styles.avatarSection} speakers={speakers} />
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
        </ScrollView> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryDARK_BLUE,
    flex: 1
  },
  scrollContainer: {
    padding: 20
  },
  title: {
    color: Colors.secondary.LIGHT_BLUE,
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
