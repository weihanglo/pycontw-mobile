import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import WebView from '../../common/PyWebView'
import {Text} from '../../common/PyText'
import * as Colors from '../../common/PyColors'

export default class extends React.Component {
  static propTypes = {
    size: PropTypes.number,
    icon: PropTypes.string,
    tag: PropTypes.string,
    text: PropTypes.string,
    isLink: PropTypes.bool
  }

  state = {
    modalVisible: false
  }

  _link

  _openBrowser = link => {
    this._link = link
    this._openModal()
  }

  _closeModal = () => {
    this.setState({modalVisible: false})
    this._link = undefined
  }

  _openModal = () => { this.setState({modalVisible: true}) }

  _renderText = (text, fontSize) => {
    const style = {fontSize}
    if (this.props.isLink) {
      style.color = Colors.secondary.DARK_BLUE
      style.textDecorationLine = 'underline'
    }
    const textNode = (
      <Text style={style} numberOfLines={1} ellipsizeMode='tail'>
        {text}
      </Text>
    )

    if (this.props.isLink) {
      return (
        <TouchableHighlight
          onPress={() => this._openBrowser(text)}
          underlayColor={Colors.secondary.MIDDLE_BLUE}
          style={{borderRadius: 5, overflow: 'hidden'}}
        >
          <View>{textNode}</View>
        </TouchableHighlight>
      )
    }
    return textNode
  }

  render () {
    const {size = 28, icon, tag, text} = this.props
    const dim = {width: size, height: size, borderRadius: size / 2}
    const fontSize = size / 8 * 5
    const color = Colors.primary.DARK_BLUE

    return (
      <View style={styles.tagItem}>
        <View style={[styles.tag, dim]}>
          {icon
            ? <Icon name={icon} size={fontSize} color={color} />
            : (
              <Text allowFontScaling={false} style={{color, fontSize}}>
                {tag}
              </Text>
            )
          }
        </View>
        <View style={styles.textWrapper}>
          {this._renderText(text, fontSize)}
        </View>

        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this._closeModal}
        >
          <WebView source={{uri: this._link}} onDone={this._closeModal} />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tagItem: {
    flexDirection: 'row',
    paddingVertical: 3
  },
  tag: {
    backgroundColor: Colors.secondary.LIGHT_BLUE,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textWrapper: {
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
    right: 0
  }
})
