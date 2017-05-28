import React from 'react'
import PropTypes from 'prop-types'
import {
  Share,
  StatusBar,
  ScrollView,
  StyleSheet,
  View,
  ViewPropTypes
} from 'react-native'

import {Heading1, Text, SmallText, Paragraph} from '../../common/PyText'
import * as Colors from '../../common/PyColors'
import Header from '../../common/PyHeader'
import Bookmark from '../../common/Bookmark'
import Py404 from '../../common/Py404'
import Category from './Category'
import Avatar from './Avatar'

const ENDPOINT = 'https://tw.pycon.org/2017/en-us/events/talk/'

export default class extends React.Component {
  static propTypes = {
    dayIndex: PropTypes.number,
    hhmmTime: PropTypes.string,
    checked: PropTypes.bool,
    duration: PropTypes.string,
    error: PropTypes.object,
    event: PropTypes.object,
    eventId: PropTypes.string,
    location: PropTypes.string,
    isFetching: PropTypes.bool,
    addToFavorites: PropTypes.func,
    removeFromFavorites: PropTypes.func,
    showSpeaker: PropTypes.func,
    goBack: PropTypes.func,
    style: ViewPropTypes.style
  }

  _onBookmarkPress = () => {
    this.props.checked
    ? this.props.removeFromFavorites(this.props.eventId)
    : this.props.addToFavorites(this.props.eventId)
  }

  _share = () => {
    const {title} = this.props.event
    const message = `${ENDPOINT}${this.props.eventId}`
    Share.share({
      title,
      message,
      url: message
    }, {
      dialogTitle: title
    })/* TODO: unhandled promise here */
  }

  render () {
    const {
      dayIndex,
      hhmmTime,
      checked,
      duration,
      event,
      error,
      location,
      isFetching,
      showSpeaker,
      goBack,
      style
    } = this.props
    const color = Colors.colorForLocation(location)

    if (isFetching || error) {
      return <Py404 headerColor={color} />
    }

    // TODO: Determine where to display description
    const {abstract, description, speakers, title, ...remains} = event

    // Configure Header
    const leftItem = (
      <Header.BackButton onPress={goBack} color={Colors.DARK_TEXT} />
    )
    const centerItem = (
      <View>
        <SmallText style={{textAlign: 'center'}}>Day {dayIndex + 1}</SmallText>
        <Text style={styles.headerTitle}>{hhmmTime}</Text>
      </View>
    )
    const rightItem = (
      <Header.ShareButton onPress={this._share} color={Colors.DARK_TEXT} />
    )

    return (
      <View style={[styles.container, style]}>
        <StatusBar barStyle='dark-content' animated />
        <Header
          leftItem={leftItem}
          centerItem={centerItem} // TODO: title centerItem
          rightItem={rightItem}
          titleColor={Colors.DARK_TEXT}
          style={{backgroundColor: color}}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>

          <View style={styles.timeLocation}>
            <Text>
              <Text style={{color, fontWeight: 'bold'}}>
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

          <Avatar
            style={styles.avatarSection}
            speakers={speakers}
            showSpeaker={showSpeaker}
          />

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
  headerTitle: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  scrollContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20
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
