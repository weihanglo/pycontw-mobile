import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  Share,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes
} from 'react-native'

import {Heading1, Text, SmallText, Paragraph} from '../../common/PyText'
import * as Colors from '../../common/PyColors'
import Header from '../../common/PyHeader'
import Bookmark from '../../common/Bookmark'
import Py404 from '../../common/Py404'
import SpeakerView from '../../components/SpeakerView'
import Description from './Description'
import Category from './Category'
import Avatar from './Avatar'

const ENDPOINT = 'https://tw.pycon.org/2017/events/talk/'

export default class extends React.Component {
  static propTypes = {
    dayIndex: PropTypes.number,
    hhmmTime: PropTypes.string,
    duration: PropTypes.string,
    error: PropTypes.object,
    event: PropTypes.object,
    eventId: PropTypes.string,
    favoriteEvents: PropTypes.objectOf(PropTypes.bool),
    location: PropTypes.string,
    isFetching: PropTypes.bool,
    saveFavorites: PropTypes.func,
    goBack: PropTypes.func,
    style: ViewPropTypes.style
  }

  state = {
    modalVisible: false,
    name: null,
    scaleAnim: new Animated.Value(0)
  }

  // Speaker view modal animations -----

  _renderSpeakView = () => {
    const backgroundColor = this.state.scaleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', 'hsla(0, 0%, 0%, 0.5)']
    })

    const {speakers} = this.props.event
    const {name} = this.state
    const speaker = speakers.filter(speaker => speaker.name === name)[0]
    const transform = [{scale: this.state.scaleAnim}]
    const style = {transform}

    const AnimTouchable = Animated
      .createAnimatedComponent(TouchableOpacity)

    return (
      <View style={styles.speaker}>
        <AnimTouchable
          style={[styles.speaker, {backgroundColor}]}
          activeOpacity={1}
          focusedOpacity={1}
          onPress={this._closeSpeaker}
        />
        <Animated.View style={[styles.animWrapper, style]}>
          <SpeakerView onClose={this._closeSpeaker} {...speaker} />
        </Animated.View>
      </View>
    )
  }

  // Do not call this directly. Use methods below instead.
  _setModalVisible = (visible, name) => {
    if (visible) {
      this.setState({modalVisible: visible, name})
    }
    const toValue = visible ? 1.0 : 0
    const duration = 250
    Animated.timing(this.state.scaleAnim, {toValue, duration})
      .start(() => this.setState({modalVisible: visible, name}))
  }

  _closeSpeaker = () => {
    this._setModalVisible(false, this.state.name)
  }

  _showSpeaker = name => {
    this._setModalVisible(true, name)
  }

  // Other handlers

  // _toggleCheck = eventId => {
  // }
  _onBookmarkPress = () => {
    const {saveFavorites, favoriteEvents, eventId} = this.props
    const checked = favoriteEvents[eventId]
    if (checked) {
      const newFavors = {...favoriteEvents}
      delete newFavors[eventId]
      saveFavorites(newFavors)
      return
    }
    saveFavorites({...favoriteEvents, [eventId]: true})
  }

  _share = () => {
    const {title, speakers} = this.props.event
    const message = `${title} by ${JSON.stringify(speakers)}: ` +
      `${ENDPOINT}${this.props.eventId} #pycontw2017`
    Share.share({title, message, url: message}, {dialogTitle: title})
    /* TODO: unhandled promise here */
  }

  render () {
    const {
      dayIndex,
      hhmmTime,
      duration,
      event,
      error,
      eventId,
      favoriteEvents,
      location,
      isFetching,
      goBack,
      style
    } = this.props
    const color = Colors.colorForLocation(location)

    if (isFetching || error) {
      return <Py404 headerColor={color} />
    }

    const {abstract, description, speakers, title, ...remains} = event

    // Configure Header ----------------
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
          centerItem={centerItem}
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
              checked={favoriteEvents[eventId]}
              onPress={this._onBookmarkPress}
            />
          </View>

          <Heading1 style={styles.title}>{title}</Heading1>
          <Avatar
            style={styles.avatarSection}
            speakers={speakers}
            showSpeaker={name => this._showSpeaker(name)}
          />

          <View style={styles.category}>
            <Category style={{flex: 1}} {...remains} />
          </View>

          <Paragraph style={styles.paragraph}>
            {abstract}
          </Paragraph>

          {
            !description && description.trim().length > 0 &&
            <Description description={description} />
          }

        </ScrollView>

        {this.state.modalVisible && this._renderSpeakView()}

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
  paragraph: {
    textAlign: 'justify'
  },
  speaker: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  animWrapper: {
    width: '80%',
    height: '80%'
  }
})
