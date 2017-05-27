import React from 'react'
import PropTypes from 'prop-types'
import {
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes
} from 'react-native'
import moment from 'moment'

import {Heading4} from '../../common/PyText'
import * as Colors from '../../common/PyColors'
import ScheduleCell from './ScheduleCell'

export default class extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    error: PropTypes.object,
    favoriteEvents: PropTypes.objectOf(PropTypes.bool),
    schedule: PropTypes.array,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
    onCellPress: PropTypes.func,
    style: ViewPropTypes.style
  }

  componentDidMount () {
    this.props.onRefresh()
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
    return (
      <TouchableOpacity onPress={() => this._onCellPress(item)}>
        <ScheduleCell {...item} checked={checked} />
      </TouchableOpacity>
    )
  }

  _renderSectionHeader = ({section}) => (
    <View style={styles.sectionHeader}>
      <Heading4 style={styles.sectionHeaderText}>
        {section.key}
      </Heading4>
    </View>
  )

  _keyExtractor = (item, index) => item.detailId

  render () {
    const {
      schedule,
      isFetching,
      error,
      style,
      onRefresh,
      refreshing,
      ...props
    } = this.props

    return (
      <View style={[styles.container, style]} {...props}>
        {schedule && (
          <SectionList
            renderItem={this._renderItem}
            renderSectionHeader={this._renderSectionHeader}
            keyExtractor={this._keyExtractor}
            onRefresh={onRefresh}
            sections={schedule}
            refreshing={refreshing}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     // TODO: remove this color and find where is my color defined
    backgroundColor: 'hsl(0, 0%, 100%)'
  },
  sectionHeader: {
    padding: 15,
    backgroundColor: Colors.LIGHT_BACKGROUND
  },
  sectionHeaderText: {
    color: Colors.DARK_TEXT
  }
})
