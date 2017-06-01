import {connect} from 'react-redux'

import ScheduleList from './BaseScheduleList'

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
  filter,
  selectDate,
  tagMapping
}) => ({
  schedule: filterSchedule(allSchedules[selectDate], filter, tagMapping)
})

export default connect(mapStateToProps)(ScheduleList)
