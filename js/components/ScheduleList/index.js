import React from 'react'
import PropTypes from 'prop-types'
import {View, ViewPropTypes, StyleSheet, SectionList} from 'react-native'

import {Heading4} from '../../common/PyText'
import * as Colors from '../../common/PyColors'
import ScheduleCell from './ScheduleCell'

export default class extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
    schedule: PropTypes.array
  }

  componentDidMount () {
    this.props.onLoad()
  }

  _renderItem = ({item}) => (<ScheduleCell {...item} />)

  _renderSectionHeader = ({section}) => (
    <View style={styles.sectionHeader}>
      <Heading4 style={styles.sectionHeaderText}>
        {section.key}
      </Heading4>
    </View>
  )

  _keyExtractor = (item, index) => item.detailId

  render () {
    const {schedule, isFetching, error , style, ...props} = this.props
    return (
      // TODO: fetching activity indicator
      <View style={[styles.container, style]} {...props}>
        {schedule && (
          <SectionList
            renderItem={this._renderItem}
            renderSectionHeader={this._renderSectionHeader}
            keyExtractor={this._keyExtractor}
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
