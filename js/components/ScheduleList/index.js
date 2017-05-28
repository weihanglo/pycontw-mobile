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

import {Heading5} from '../../common/PyText'
import * as Colors from '../../common/PyColors'
import ScheduleCell from './ScheduleCell'

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
    style: ViewPropTypes.style
  }

  componentDidMount () {
    this.props.onDidMount()
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
      <TouchableOpacity onPress={() => this._onCellPress(item)}>
        <ScheduleCell {...item} tags={tags} checked={checked} />
      </TouchableOpacity>
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
    const {schedule, tagMapping, style, ...props} = this.props

    return (
      <View style={[styles.container, style]} {...props}>
        {schedule && (
          <SectionList
            renderItem={this._renderItem}
            renderSectionHeader={this._renderSectionHeader}
            keyExtractor={this._keyExtractor}
            sections={schedule}
            stickySectionHeadersEnabled={false}
          />
        )}
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
