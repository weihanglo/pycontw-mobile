import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  Modal,
  SectionList,
  StyleSheet,
  TouchableHighlight,
  View,
  ViewPropTypes
} from 'react-native'
import moment from 'moment'

import {Heading5} from '../../common/PyText'
import * as Colors from '../../common/PyColors'
import Cell from './Cell'
import Header from './Header'
import Filter from './Filter'

export default class extends React.Component {
  static propTypes = {
    date: PropTypes.string,
    error: PropTypes.object,
    favoriteEvents: PropTypes.objectOf(PropTypes.bool),
    isFetching: PropTypes.bool,
    schedule: PropTypes.array,
    tagMapping: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    onDidMount: PropTypes.func,
    onCellPress: PropTypes.func,
    navigation: PropTypes.object,
    style: ViewPropTypes.style
  }

  state = {
    modalVisible: false,
    scaleAnim: new Animated.Value(1)
  }

  componentDidMount () {
    this.props.onDidMount()
  }

  _setModalVisible = visible => {
    this.setState({modalVisible: visible})
    const toValue = visible ? 0.95 : 1.0
    const duration = 400
    Animated.timing(this.state.scaleAnim, {toValue, duration}).start()
  }

  _onCellPress ({detailId, location, beginTime, endTime}) {
    const begin = moment(beginTime, 'hh:mm')
    const end = moment(endTime, 'hh:mm')
    const duration = moment.duration(end.diff(begin)).humanize()
    this.props.onCellPress(detailId, location, duration)
  }

  _renderItem = ({item}) => {
    const {detailId} = item
    const checked = !!this.props.favoriteEvents[detailId]
    const tags = this.props.tagMapping[detailId]
    return (
      <TouchableHighlight onPress={() => this._onCellPress(item)}>
        <View>
          <Cell {...item} tags={tags} checked={checked} />
        </View>
      </TouchableHighlight>
    )
  }

  _renderSectionHeader = ({section}) => (
    <View style={styles.sectionHeader}>
      <Heading5 style={styles.sectionHeaderText}>
        {section.key}
      </Heading5>
    </View>
  )

  _keyExtractor = (item, index) => item.detailId

  render () {
    const {navigation, schedule, tagMapping, style, ...props} = this.props
    const {routeName} = navigation.state
    const headerBgColor = Colors.colorForRoute(routeName)

    const transform = [{scale: this.state.scaleAnim}]

    const opacity = this.state.scaleAnim.interpolate({
      inputRange: [0.95, 1],
      outputRange: [0.5, 1]
    })

    return (
      <View style={[styles.container, style]} {...props} >
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this._setModalVisible(false)}
        >
          <Filter
            headerBackgroundColor={headerBgColor}
            onPressDone={() => this._setModalVisible(false)}
          />
        </Modal>

        <Animated.View style={{transform, opacity}}>
          <Header
            centerItem={routeName}
            backgroundColor={headerBgColor}
            onFilterPress={() => this._setModalVisible(true)}
          />
          {schedule && (
            <SectionList
              renderItem={this._renderItem}
              renderSectionHeader={this._renderSectionHeader}
              keyExtractor={this._keyExtractor}
              sections={schedule}
              stickySectionHeadersEnabled={false}
            />
          )}
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(0, 0%, 100%)'
  },
  sectionHeader: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: Colors.LIGHT_BACKGROUND
  },
  sectionHeaderText: {
    color: Colors.DARK_TEXT
  }
})
