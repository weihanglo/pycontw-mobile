import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import ScheduleList from './BaseScheduleList'

function filterSchedule (schedule, filter, tagMapping, favoriteEvents) {
  if (Object.keys(favoriteEvents).length <= 0) {
    return []
  }
  const noFilter = Object.keys(filter).length <= 0
  return schedule.map(({key, data}) => ({
    key,
    data: data.filter(({eventId, type}) => {
      if (!favoriteEvents[eventId]) {
        return false
      }

      if (noFilter) {
        return true
      }

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
  schedule: {schedule},
  favoriteEvents,
  filter,
  tagMapping
}) => ({
  schedule: filterSchedule(
    schedule,
    filter,
    tagMapping,
    favoriteEvents
  )
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  goToSchedule: () => {
    dispatch(NavigationActions.navigate({routeName: 'Schedule'}))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleList)
