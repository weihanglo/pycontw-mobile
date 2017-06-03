import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  ViewPropTypes
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import WebView from '../../common/PyWebView'
import Avatar from '../../common/Avatar'
import {Heading1, Paragraph} from '../../common/PyText'
import SocialIcon from './SocialIcon'

export default class extends React.Component {
  static propTypes = {
    bio: PropTypes.string,
    email: PropTypes.string,
    facebookURL: PropTypes.string,
    githubId: PropTypes.string,
    name: PropTypes.string,
    photoURL: PropTypes.string,
    twitterId: PropTypes.string,
    website: PropTypes.string,
    onClose: PropTypes.func,
    style: ViewPropTypes.style
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

  _renderBio = bio => {
    const bioText = bio && bio.trim()
    let bioP = <Paragraph style={{textAlign: 'center'}}>{bioText}</Paragraph>
    const newlines = /(\n)/.exec(bioText)
    const newlineCountExceeded = newlines && newlines.lenght > 1
    if (bioText.length > 130 || newlineCountExceeded) {
      bioP = <ScrollView style={styles.bioWrapper}>{bioP}</ScrollView>
    }
    return bioP
  }

  render () {
    const {
      bio,
      email,
      facebookURL,
      githubId,
      name,
      photoURL,
      twitterId,
      website,
      onClose,
      style,
      ...props
    } = this.props

    // Determine if biography field should scroll

    return (
      <View style={[styles.container, style]} {...props}>
        <View style={styles.photoWrapper}>
          <Avatar size={120} uri={photoURL} text={name} />
        </View>
        <Heading1 style={styles.name}>{name}</Heading1>
        <View style={styles.iconWrapper}>
          {!!email && <SocialIcon type='email' info={email} />}
          {!!facebookURL && (
            <SocialIcon
              type='facebook'
              info={facebookURL}
              openBrowser={this._openBrowser} />
          )}
          {!!twitterId && (
            <SocialIcon
              type='twitter'
              info={twitterId}
              openBrowser={this._openBrowser} />
          )}
          {!!githubId && (
            <SocialIcon
              type='github'
              info={githubId}
              openBrowser={this._openBrowser} />
          )}
          {!!website && (
            <SocialIcon
              type='website'
              info={website}
              openBrowser={this._openBrowser} />
          )}
        </View>
        <View style={styles.bioWrapper}>
          {this._renderBio(bio)}
        </View>

        <TouchableOpacity style={styles.close} onPress={onClose}>
          <Icon name='close' size={25} />
        </TouchableOpacity>

        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this._closeModal}
        >
          <WebView
            source={{uri: this._link}}
            onDone={this._closeModal} 
            startInLoadingState
          />
        </Modal>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  photoWrapper: {
    flex: 1,
    flexBasis: 130,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'cover'
  },
  name: {
    textAlign: 'center'
  },
  iconWrapper: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 200
  },
  bioWrapper: {
    overflow: 'hidden',
    flex: 3,
    padding: 4,
    width: '100%'
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 44,
    height: 44,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
