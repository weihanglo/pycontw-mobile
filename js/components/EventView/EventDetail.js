import React from 'react'
import PropTypes from 'prop-types'
import {Button, View, WebView, StyleSheet} from 'react-native'

import MarkdownIt from 'markdown-it'

const PADDING_BOTTOM = 20;

export default class extends React.Component {
  mark = MarkdownIt()

  state = {
    height: 0
  }

  _webViewRef = null
  _isLoadEnded = false

  onLoadEnd = () => {
    if (this._isLoadEnded) {
      return
    }
    if (this._webViewRef) {
        this._isLoadEnded = true
        this._webViewRef.injectJavaScript(
          'window.postMessage(document.documentElement.scrollHeight)'
        )
      return
    }
    setTimeout(this.onLoadEnd, 1000)
  }

  render () {
    const html = this.mark.render(this.props.detail)
    return (
      <View>
        <WebView
          style={{height: this.state.height}}
          ref={webView => { this._webViewRef = webView }}
          onLoadEnd={this.onLoadEnd()}
          onMessage={ev => {
            this.setState({height: parseInt(ev.nativeEvent.data) + PADDING_BOTTOM})
          }}
          source={{html}}
        />
      </View>
    )
  }
}
