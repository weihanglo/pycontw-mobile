import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import {fetchSchedules} from '../actions/fetchSchedules'
import {fetchEvent} from '../actions/fetchEvent'
import {fetchTagMapping} from '../actions/fetchTagMapping'
import {updateFilter} from '../actions/updateFilter'
import ScheduleList from '../components/ScheduleList'

function filterSchedule (schedule, filter, tagMapping) {
  if (Object.keys(filter).length <= 0) {
    return schedule
  }

  return schedule.map(({key, data}) => ({
    key,
    data: data.filter(({eventId, type}) => {
      if (filter[type.toUpperCase()]) {
        return true
      }

      const tags = tagMapping[eventId] || []

      for (let tag of tags) {
        if (filter[tag]) {
          return true
        }
      }

      return false
    })
  }))
}

const mapStateToProps = ({
  allSchedules,
  favoriteEvents,
  filter,
  selectDate,
  tagMapping
}) => {
  const schedule = filterSchedule(allSchedules[selectDate], filter, tagMapping)

  return {
    error: allSchedules.error,
    favoriteEvents,
    filter,
    isFetching: allSchedules.isFetching,
    schedule,
    tagMapping
  }
}

const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchTagMapping())
    dispatch(fetchSchedules())
  },
  onCellPress: (eventId, location, beginTime, endTime) => {
    dispatch(fetchEvent(eventId))
    dispatch(NavigationActions.navigate({
      routeName: 'Event',
      params: {location, beginTime, endTime}
    }))
  },
  ...bindActionCreators({
    updateFilter
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleList)
