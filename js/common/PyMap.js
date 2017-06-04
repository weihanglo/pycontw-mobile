import React from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes
} from 'react-native'

import Header from './PyHeader'
import {LargeText} from './PyText'
import * as Colors from './PyColors'
import I18n from '../i18n'

export default class extends React.Component {
  static propTypes = {
    headerProps: PropTypes.object,
    onDone: PropTypes.func.isRequired,
    style: ViewPropTypes.style
  }
  state = {
    pagingEnabled: true
  }

  _onScroll = ({nativeEvent: {zoomScale}}) => {
    this.setState(() => ({pagingEnabled: zoomScale <= 1}))
  }

  render () {
    const {
      headerProps,
      onDone,
      style
    } = this.props

    const rightItem = (
      <TouchableOpacity onPress={onDone}>
        <LargeText style={styles.item}>{I18n.t('Done')}</LargeText>
      </TouchableOpacity>
    )

    const {width} = Dimensions.get('window')
    return (
      <View style={[styles.container, style]}>
        <StatusBar translucent={false} />
        <Header
          centerItem={I18n.t('Map')}
          rightItem={rightItem}
          titleColor={Colors.LIGHT_TEXT}
          style={{backgroundColor: Colors.primary.MIDDLE_BLUE}}
          isModal
          {...headerProps}
        />
        <ScrollView
          contentContainerStyle={{backgroundColor: 'hsl(180, 5%, 90%)'}}
          onScroll={this._onScroll}
          maximumZoomScale={3}
          scrollEventThrottle={500}
          pagingEnabled={this.state.pagingEnabled}
          horizontal
        >
          <View>
            <Image
              style={{flex: 1, width, height: undefined}}
              source={require('./images/map-3f.png')}
              resizeMode='contain'
            />
          </View>
          <View>
            <Image
              style={{flex: 1, width, height: undefined}}
              source={require('./images/map-4f.png')}
              resizeMode='contain'
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    color: Colors.LIGHT_TEXT,
    fontSize: 18
  }
})
