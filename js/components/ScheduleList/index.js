import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, SectionList} from 'react-native'

import {Heading4} from '../../common/PyText'
import * as Colors from '../../common/PyColors'
import ScheduleCell from './ScheduleCell'

// TODO: remove these imports
import ApiUtils from '../../apiUtils'
import scheduleReducer from '../../reducers/events'

export default class extends React.Component {
  static propTypes = {
    style: PropTypes.object
  }

  state = {
    events: null
  }

  // TODO: should manage states in MobX or Redux
  async componentDidMount () {
    try {
      const schedule = await ApiUtils.getTalkSchedule('2017-06-10')
      const action = {
        type: 'SCHEDULE_LOADED',
        schedule
      }
      const events = scheduleReducer(null, action)
      this.setState(() => ({events}))
    } catch (e) {
      console.warn(`get schdule failed: ${e}`)
    }
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
    const {style, ...props} = this.props
    const {events} = this.state
    return (
      <View style={[styles.container, style]} {...props}>
        {events && (
          <SectionList
            renderItem={this._renderItem}
            renderSectionHeader={this._renderSectionHeader}
            sections={this.state.events}
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
