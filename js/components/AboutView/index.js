import React from 'react'
// import PropTypes from 'prop-types'
import {
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  ViewPropTypes
} from 'react-native'

import Header from '../../common/PyHeader'
import * as Colors from '../../common/PyColors'
import Slogan from './Slogan'

export default class extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style
  }

  _onCellPress = item => {
    console.warn(item)
  }

  _renderItem = ({item}) => {
    return (
      <TouchableHighlight onPress={() => this._onCellPress(item)}>
        <View>
          <Text key={item.title}>{item.title}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render () {
    const {style} = this.props

    return (
      <View style={[styles.container, style]}>
        <Header
          centerItem='About'
          style={{backgroundColor: Colors.secondary.DARK_BLUE}}
          titleColor={Colors.LIGHT_TEXT}
        />
        <View style={styles.wrapper}>
          <Slogan />
          <FlatList
            data={[
              {title: 'PyCon Taiwan'},
              {title: 'Code of Conduct'},
              {title: 'Out Partners'}
            ]}
            renderItem={this._renderItem}
            keyExtractor={item => item.title}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.DARK_BLUE
  },
  wrapper: {
    flex: 1,
    padding: 20
  }
})
