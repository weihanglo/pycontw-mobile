import {connect} from 'react-redux'
import {fetchSchedule} from '../actions/fetchSchedule'

import ScheduleList from '../components/ScheduleList'

const mapStateToProps = ({scheduleByDate, selectDate}) => {
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
    isFetching,
    error,
    schedule
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleList)
