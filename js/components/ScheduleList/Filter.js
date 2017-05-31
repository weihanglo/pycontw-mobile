import React from 'react'
import PropTypes from 'prop-types'
import {
  LayoutAnimation,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
  ViewPropTypes
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Header from '../../common/PyHeader'
import {Heading2, Text} from '../../common/PyText'
import * as Colors from '../../common/PyColors'

// Flag to enable LayoutAnimation in Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

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

  _layoutAnimating = false

  componentWillUpdate () {
    const {Types, Properties} = LayoutAnimation
    const config = {
      duration: 700,
      create: {
        duration: 200,
        type: Types.easeInEaseOut,
        property: Properties.opacity
      },
      update: {
        type: Types.spring,
        springDamping: 0.55
      },
      delete: {
        duration: 200,
        type: Types.easeInEaseOut,
        property: Properties.opacity
      }
    }
    LayoutAnimation.configureNext(config,
      this._onLayoutAnimationEnd)
  }

  componentDidMount () {
    this.setState({filter: this.props.filter || {}})
  }

  _onLayoutAnimationEnd = () => {
    this._layoutAnimating = false
  }

  _toggleTag = tag => {
    if (this._layoutAnimating) {
      return
    }
    this._animating = true
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

  render () {
    const {
      headerBackgroundColor,
      tags,
      isModal,
      onFilterDone,
      style
    } = this.props

    const {filter} = this.state

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

    const tagItems = tags && tags
      .map(tag => (
        <TouchableOpacity
          key={tag}
          onPress={() => this._toggleTag(tag)}
        >
          <View style={[styles.tag, {backgroundColor: Colors.colorForTag(tag)}]}>
            <Text style={styles.tagText}>
              {tag}
            </Text>
          </View>
          {filter[tag] && (
            <View style={styles.tagCheckIcon}>
              <Icon color='hsl(0, 0%, 40%)' name='check-circle' size={16} />
            </View>
          )}
        </TouchableOpacity>
      ))

    const selected = []
    const unselected = []
    tagItems.forEach((tagItem, i) => {
      if (filter[tags[i]]) {
        selected.push(tagItem)
        return
      }
      unselected.push(tagItem)
    })

    const hellStyle = unselected.length === 0
      ? {flex: 1, borderTopWidth: undefined}
      : {flex: undefined, borderTopWidth: 0}
    return (

      <View style={[styles.container, style]}>
        <StatusBar translucent={false} />
        <Header
          leftItem={leftItem}
          centerItem='Filter'
          rightItem={rightItem}
          titleColor={Colors.LIGHT_TEXT}
          style={{backgroundColor: headerBackgroundColor}}
          isModal={isModal}
        />
        <View style={styles.tagPlayground}>
          <View style={styles.tagSelectedSetion}>
            {selected.length > 0
              ? selected
              : (
                <Heading2 style={styles.hint}>
                  Your selections will show up here.
                </Heading2>
              )
            }
          </View>
          <View style={[styles.tagUnselectedSection, hellStyle]}>
            {unselected.length > 0
              ? unselected
              : (
                <Heading2 style={styles.hint}>
                  You've selected all tags!
                </Heading2>
              )
            }
          </View>
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
  hint: {
    color: 'hsl(0, 0%, 85%)',
    textAlign: 'center',
    alignSelf: 'center'
  },
  tagPlayground: {
    flex: 1,
    justifyContent: 'space-between'
  },
  tagSelectedSetion: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.ULTRALIGHT_BACKGROUND
  },
  tagUnselectedSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  tag: {
    margin: 8,
    padding: 8,
    backgroundColor: 'green',
    borderRadius: 10
  },
  tagText: {
    color: 'white'
  },
  tagCheckIcon: {
    position: 'absolute',
    top: 3,
    right: 3,
    backgroundColor: 'transparent'
  }
})
