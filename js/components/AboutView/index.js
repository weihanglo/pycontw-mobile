import React from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  LayoutAnimation,
  Modal,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
  ViewPropTypes
} from 'react-native'
import DeviceInfo from 'react-native-device-info'

import * as Colors from '../../common/PyColors'
import WebView from '../../common/PyWebView'
import Header from '../../common/PyHeader'
import Map from '../../common/PyMap'
import {Heading2, Text} from '../../common/PyText'
import Slogan from './Slogan'
import GradientLine from './GradientLine'
import Cell from './Cell'
import Footer from './Footer'
import data from './data/data'
import I18n from '../../i18n'

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

export default class extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style
  }

  state = {
    modalVisible: false,
    widthAnim: new Animated.Value(0),
    opacityAnim: new Animated.Value(0),
    showInfo: false
  }

  _link
  _flagToPreventAnimationBlockAndroidJSThread = false

  _animate = () => {
    const {delay, timing} = Animated
    Animated.sequence([
      delay(350),
      timing(this.state.widthAnim, {
        toValue: 1,
        easing: Easing.elastic(1.5),
        duration: 350
      }),
      delay(200),
      timing(this.state.opacityAnim, {
        toValue: 1,
        easing: Easing.linear,
        duration: 200
      }),
      delay(150)
    ]).start(() => this.setState({showInfo: true}))
  }

  componentDidMount () {
    this._animate()
  }

  componentWillUpdate () {
    if (this._flagToPreventAnimationBlockAndroidJSThread) {
      return
    }
    LayoutAnimation.easeInEaseOut()
  }

  _onPressCell = link => {
    this._link = link
    this._openModal()
  }

  _closeModal = () => {
    this._flagToPreventAnimationBlockAndroidJSThread = true
    this.setState({modalVisible: false})
    this._link = undefined
  }
  _openModal = () => { this.setState({modalVisible: true}) }

  _renderItem = ({item}) => (<Cell onPress={this._onPressCell}{...item} />)

  render () {
    const {style} = this.props
    const {widthAnim, opacityAnim, showInfo} = this.state
    const {width: length, height} = Dimensions.get('window')

    const width = widthAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '90%']
    })

    // Slogan min-height
    const minHeight = showInfo ? undefined : height / 2

    return (
      <View style={[styles.container, style]}>
        <Header
          centerItem={I18n.t('About')}
          style={{backgroundColor: Colors.secondary.DARK_BLUE}}
          titleColor={Colors.LIGHT_TEXT}
        />
        <ScrollView contentContainerStyle={styles.wrapper}>
          <View style={[styles.slogan, {minHeight}]}>
            <Slogan />
            <Animated.View style={[styles.line, {width}]}>
              <GradientLine length={length} />
            </Animated.View>
            <Animated.View style={{opacity: opacityAnim}}>
              <Heading2 style={{color: 'white'}}>
                {I18n.t('9-11 June')}
              </Heading2>
            </Animated.View>
          </View>

          {showInfo && data.map(item => (
            <Cell key={item.title} onPress={this._onPressCell}{...item} />
          ))}
          {showInfo && <Footer />}
          {showInfo && (
            <Text style={styles.appVersion}>
              Version: {DeviceInfo.getVersion()}.{DeviceInfo.getBuildNumber()}
            </Text>
          )}

        </ScrollView>

        <Modal
          animationType='fade'
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this._closeModal}
        >
          {this._link && this._link.length > 0
            ? (
              <WebView
                source={{uri: this._link}}
                onDone={this._closeModal}
                startInLoadingState
              />
            )
            : <Map onDone={this._closeModal} />
          }
        </Modal>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.primary.DARK_BLUE
  },
  wrapper: {
    padding: 20
  },
  slogan: {
    paddingVertical: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    paddingVertical: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    // HACK: add border for android to hide overflowing content
    borderWidth: 0
  },
  appVersion: {
    marginTop: 80,
    textAlign: 'center',
    color: Colors.LIGHT_TEXT
  }
})
