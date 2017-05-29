import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  Share,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
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
import SpeakerView from '../../components/SpeakerView'

const AnimTouchable = Animated.createAnimatedComponent(TouchableOpacity)

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

    return (
      <AnimTouchable
        style={[styles.speaker, {backgroundColor}]}
        activeOpacity={1}
        focusedOpacity={1}
        onPress={this._closeSpeaker}>
        <TouchableWithoutFeedback onPress={null}>
          <Animated.View style={[styles.animWrapper, style]}>
            <SpeakerView onClose={this._closeSpeaker} {...speaker} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </AnimTouchable>
    )
  }

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

  _onBookmarkPress = () => {
    this.props.checked
    ? this.props.removeFromFavorites(this.props.eventId)
    : this.props.addToFavorites(this.props.eventId)
  }

  _share = () => {
    const {title, speakers} = this.props.event
    const message = `${title} by ${JSON.stringify(speakers)}: ` +
      `${ENDPOINT}${this.props.eventId}`
    Share.share({title, message, url: message}, {dialogTitle: title})
    /* TODO: unhandled promise here */
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
      goBack,
      style
    } = this.props
    const color = Colors.colorForLocation(location)

    if (isFetching || error) {
      return <Py404 headerColor={color} />
    }

    // TODO: Determine where to display description
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
              checked={checked}
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
          <Paragraph style={styles.abstract}>{abstract}</Paragraph>
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
  abstract: {
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
