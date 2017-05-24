import React from 'react'
import PropTypes from 'prop-types'
import {View, ViewPropTypes, StyleSheet, SectionList} from 'react-native'

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
    style: ViewPropTypes.style
  }

  componentDidMount () {
    this.props.onRefresh()
  }

  _renderItem = ({item}) => {
    const checked = !!this.props.favoriteEvents[item.detailId]
    return <ScheduleCell {...item} checked={checked} />
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
    flex: 1
  },
  sectionHeader: {
    padding: 15,
    backgroundColor: Colors.LIGHT_BACKGROUND
  },
  sectionHeaderText: {
    color: Colors.DARK_TEXT
  }
})
