import React from 'react'
import PropTypes from 'prop-types'
import {ScrollView, StyleSheet, View, ViewPropTypes} from 'react-native'

import {Text, Heading1, Paragraph} from '../../common/PyText'
import * as Colors from '../../common/PyColors'
import Bookmark from '../../common/Bookmark'
import Category from './Category'
import Avatar from './EventAvatar'

export default class extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    eventId: PropTypes.string,
    event: PropTypes.object,
    error: PropTypes.object,
    isFetching: PropTypes.bool,
    addToFavorites: PropTypes.func,
    removeFromFavorites: PropTypes.func,
    location: PropTypes.string,
    duration: PropTypes.string,
    style: ViewPropTypes.style
  }

  _onBookmarkPress = () => {
    this.props.checked
    ? this.props.removeFromFavorites(this.props.eventId)
    : this.props.addToFavorites(this.props.eventId)
  }

  render () {
    const {
      checked,
      event,
      error,
      isFetching,
      location,
      duration,
      style
    } = this.props

    if (isFetching || error) {
      // TODO: customized Error/Loading Page
      return (
        <View sytle={[styles.container]} >
          <Heading1>{isFetching ? 'Loading...' : 'Error!!!!!!!'}</Heading1>
        </View>
      )
    }

    // TODO: Determine where to display description
    const {abstract, description, speakers, title, ...remains} = event

    return (
      <View style={[styles.container, style]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.timeLocation}>
            <Text>
              <Text style={{color: Colors.colorForLocation(location)}}>
                {location}
              </Text>
              <Text> - {duration}</Text>
            </Text>
            <Bookmark
              checked={checked}
              onPress={this._onBookmarkPress}
            />
          </View>

          <Heading1 style={styles.title}>{title}</Heading1>

          <Avatar style={styles.avatarSection} speakers={speakers} />
          <View style={styles.category}>
            <Category style={{flex: 1}} {...remains} />
          </View>
          <Paragraph style={styles.abstract}>{abstract}</Paragraph>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  scrollContainer: {
    padding: 20
  },
  timeLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: Colors.secondary.MIDDLE_BLUE,
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
