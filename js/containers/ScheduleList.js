import {connect} from 'react-redux'
import {fetchSchedule} from '../actions/fetchSchedule'
import {selectDate} from '../actions/selectDate'

import ScheduleList from '../components/ScheduleList'

const mapStateToProps = ({favoriteEvents, scheduleByDate, selectDate}) => {
  const {
    isFetching,
    error,
    schedule
  } = scheduleByDate[selectDate] || {
    isFetching: false,
    error: null,
    schedule: []
  }

  return {
    favoriteEvents,
    error,
    refreshing: isFetching,
    schedule
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRefresh: () => {
      dispatch(selectDate('2017-06-09'))
      dispatch(fetchSchedule('2017-06-09'))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleList)
