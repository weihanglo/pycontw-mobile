import React from 'react'
import PropTypes from 'prop-types'
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes
} from 'react-native'

import Header from '../../common/PyHeader'
import {Text} from '../../common/PyText'
import * as Colors from '../../common/PyColors'

export default class extends React.Component {
  static propTypes = {
    headerBackgroundColor: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    filter: PropTypes.objectOf(PropTypes.bool),
    isModal: PropTypes.bool,
    onFilterDone: PropTypes.func,
    style: ViewPropTypes.style
  }

  state = {
    filter: {}
  }

  componentDidMount () {
    this.setState({filter: this.props.filter || {}})
  }

  _toggleTag = tag => {
    const filter = {...this.state.filter}
    if (filter[tag]) {
      delete filter[tag]
      this.setState({filter})
      return
    }

    filter[tag] = true
    this.setState({filter})
  }

  _onPressReset = () => {
    this.setState({filter: {}})
  }

  _getFilteredStyle = tag => (
    this.state.filter[tag]
    ? {backgroundColor: 'red'}
    : {backgroundColor: Colors.colorForTag(tag)}
  )

  render () {
    const {headerBackgroundColor, tags, onFilterDone, style} = this.props

    const leftItem = (
      <TouchableOpacity onPress={this._onPressReset}>
        <Text style={styles.item}>Reset</Text>
      </TouchableOpacity>
    )
    const rightItem = (
      <TouchableOpacity onPress={() => onFilterDone(this.state.filter)}>
        <Text style={styles.item}>Done</Text>
      </TouchableOpacity>
    )

    return (
      <View style={[styles.container, style]}>
        <StatusBar translucent={false} />
        <Header
          leftItem={leftItem}
          centerItem='Filter'
          rightItem={rightItem}
          titleColor={Colors.LIGHT_TEXT}
          style={{backgroundColor: headerBackgroundColor}}
          isModal
        />
        <View style={styles.tagPlayground}>
          {tags && tags.map(tag => (
            <TouchableOpacity
              key={tag}
              onPress={() => this._toggleTag(tag)}
              style={[styles.tag, this._getFilteredStyle(tag)]}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    color: Colors.LIGHT_TEXT
  },
  tagPlayground: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  tag: {
    margin: 8,
    padding: 8,
    backgroundColor: 'green',
    borderRadius: 10
  },
  tagText: {
    color: 'white'
  }
})
