import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, SectionList} from 'react-native'

import {Heading4} from '../../common/PyText'
import * as Colors from '../../common/PyColors'
import ScheduleCell from './ScheduleCell'

export default class extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    schedule: PropTypes.array
  }

  _renderItem = ({item}) => { return (<ScheduleCell {...item.data} />) }

  _renderSectionHeader = ({section}) => {
    return (
      <View style={styles.sectionHeader}>
        <Heading4 style={styles.sectionHeaderText}>
          {section.key}
        </Heading4>
      </View>
    )
  }

  render () {
    const {schedule, isFetching, error, style, ...props} = this.props
    return (
      <View style={[styles.container, style]} {...props}>
        {schedule && (
          <SectionList
            renderItem={this._renderItem}
            renderSectionHeader={this._renderSectionHeader}
            sections={schedule}
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
