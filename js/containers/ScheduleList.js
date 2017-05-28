import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import {
  fetchSchedule,
  fetchScheduleRemote
} from '../actions/fetchSchedule'
import {fetchEvent} from '../actions/fetchEvent'
import ScheduleList from '../components/ScheduleList'

const initialState = {
  error: null,
  schedule: []
}

const mapStateToProps = ({favoriteEvents, scheduleByDate, selectDate}) => {
  const {
    isFetching,
    error,
    schedule
  } = scheduleByDate[selectDate] || initialState

  return {
    favoriteEvents,
    error,
    schedule: isFetching ? [] : schedule,
    date: selectDate
  }
}

const mapDispatchToProps = dispatch => ({
  onDidMount: date => {
    dispatch(fetchSchedule(date))
  },
  onCellPress: (eventId, location, duration) => {
    dispatch(fetchEvent(eventId))
    dispatch(NavigationActions.navigate({
      routeName: 'Event',
      params: {location, duration}
    }))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleList)
