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

import * as Colors from '../../common/PyColors'
import WebView from '../../common/PyWebView'
import Header from '../../common/PyHeader'
import {Heading2} from '../../common/PyText'
import Slogan from './Slogan'
import GradientLine from './GradientLine'
import Cell from './Cell'
import Footer from './Footer'
import data from './data.json'

// Flag to enable LayoutAnimation in Android
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

  _animate = () => {
    const {delay, timing} = Animated
    Animated.sequence([
      delay(1000),
      timing(this.state.widthAnim, {
        toValue: 1,
        easing: Easing.elastic(1.5),
        duration: 500
      }),
      delay(400),
      timing(this.state.opacityAnim, {
        toValue: 1,
        easing: Easing.linear
      }),
      delay(700)
    ]).start(() => this.setState({showInfo: true}))
  }

  componentDidMount () {
    this._animate()
  }

  componentWillUpdate () {
    LayoutAnimation.easeInEaseOut()
  }

  _onPressCell = link => {
    this._link = link
    this._openModal()
  }

  _closeModal = () => { this.setState({modalVisible: false}) }
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
          centerItem='About'
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
                9-11 June
              </Heading2>
            </Animated.View>
          </View>

          {showInfo && data.map(item => (
            <Cell key={item.title} onPress={this._onPressCell}{...item} />
          ))}
          {showInfo && <Footer />}

        </ScrollView>

        <Modal
          animationType='fade'
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this._closeModal}
        >
          <WebView
            source={{uri: this._link}}
            onDone={this._closeModal}
            isModal
          />
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
  }
})
