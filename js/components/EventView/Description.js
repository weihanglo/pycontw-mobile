import React from 'react'
import PropTypes from 'prop-types'
import {Platform, StyleSheet, View, WebView} from 'react-native'
import Icon from 'react-native-vector-icons/Octicons'
import MarkdownIt from 'markdown-it'

import {Heading5, Paragraph} from '../../common/PyText'
import * as Colors from '../../common/PyColors'
import I18n from '../../i18n'

const MARKDOWN_BOTTOM_PADDING = 10

export default class extends React.Component {
  static propTypes = {
    description: PropTypes.string.isRequired
  }

  state = {
    webViewHeight: 0,
    usingMarkdown: false
  }

  _webViewRef
  _isMarkdownLoaded = false

  _onLoadEnd = () => {
    if (this._isMarkdownLoaded) {
      return
    }
    if (this._webViewRef) {
      this._isMarkdownLoaded = true
      this._webViewRef.injectJavaScript(`
        window.postMessage(document.documentElement.scrollHeight);
      `)
      return
    }
    setTimeout(this._onLoadEnd, 500)
  }

  _onMessage = ({nativeEvent: {data}}) => {
    this.setState({webViewHeight: parseInt(data) + MARKDOWN_BOTTOM_PADDING})
  }

  _onPress = () => {
    const {usingMarkdown} = this.state
    this._isMarkdownLoaded = false
    // HACK: WebView#onLoadEnd did not call in iOS, we call it manually
    if (!usingMarkdown && Platform.OS === 'ios') {
      this._onLoadEnd()
    }
    this.setState({usingMarkdown: !this.state.usingMarkdown})
  }

  _onLayoutParagraph = ({nativeEvent: {layout: {height}}}) => {
    this.setState({webViewHeight: height})
  }

  _renderContent = () => {
    const {usingMarkdown, webViewHeight} = this.state
    const {description} = this.props

    if (usingMarkdown) {
      if (!this._markdown) {
        this._markdown = MarkdownIt().render(description)
      }

      return (
        <WebView
          style={{height: webViewHeight}}
          ref={webView => { this._webViewRef = webView }}
          onLoadEnd={this._onLoadEnd}
          onMessage={this._onMessage}
          source={{html: this._markdown}}
          dataDetectorTypes='all'
          scrollEnabled={false}
        />
      )
    }

    return (
      <Paragraph onLayout={this._onLayoutParagraph} selectable>
        {description}
      </Paragraph>
    )
  }

  render () {
    const {usingMarkdown} = this.state

    return (
      <View>
        <View style={styles.titleSection}>
          <Heading5 style={styles.title}>
            {I18n.t('Talk Detail')}
          </Heading5>
          <View style={styles.renderModeButton}>
            <Icon.Button
              name={usingMarkdown ? 'file-text' : 'markdown'}
              backgroundColor={Colors.secondary.DARK_BLUE}
              color={Colors.LIGHT_TEXT}
              onPress={this._onPress}
            >
              {usingMarkdown
                ? I18n.t('I Prefer PlainText')
                : I18n.t('Read in Markdown!')
              }
            </Icon.Button>
          </View>
        </View>

        {this._renderContent()}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleSection: {
    marginTop: 20,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center'
  },
  renderModeButton: {
    marginLeft: 'auto',
    marginRight: 3
  }
})
