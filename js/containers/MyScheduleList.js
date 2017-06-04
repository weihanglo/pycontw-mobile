import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import ScheduleList from './BaseScheduleList'

function filterSchedule (schedule = [], filter, tagMapping, favoriteEvents) {
  if (Object.keys(favoriteEvents).length <= 0) {
    return []
  }
  const newSchedule = []
  const noFilter = Object.keys(filter).length <= 0

  for (let {key, data} of schedule) {
    const newData = data.filter(({eventId, type}) => {
      if (!favoriteEvents[eventId]) { return false }

      if (noFilter) { return true }

      if (filter[type.toUpperCase()]) { return true }

      const tags = tagMapping[eventId] || []

      for (let tag of tags) {
        if (filter[tag]) {
          return true
        }
      }

      return false
    })
    if (newData.length > 0) {
      newSchedule.push({key, data: newData})
    }
  }
  return newSchedule
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
