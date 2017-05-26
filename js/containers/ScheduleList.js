import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import {fetchSchedule} from '../actions/fetchSchedule'
import {fetchEvent} from '../actions/fetchEvent'
import {selectDate} from '../actions/selectDate'

import ScheduleList from '../components/ScheduleList'

const initialState = {
  isFetching: false,
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
    refreshing: isFetching,
    schedule
  }
}

const mapDispatchToProps = dispatch => ({
  onRefresh: () => {
    dispatch(selectDate('2017-06-09'))
    dispatch(fetchSchedule('2017-06-09'))
  },
  onCellPress: eventId => {
    dispatch(fetchEvent(eventId))
    dispatch(NavigationActions.navigate({
      routeName: 'Event',
      params: {eventId}
    }))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleList)
