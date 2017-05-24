import {connect} from 'react-redux'
import {fetchSchedule} from '../actions/fetchSchedule'
import {selectDate} from '../actions/selectDate'

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
  return {
    onLoad: () => {
      dispatch(selectDate('2017-06-09'))
      dispatch(fetchSchedule('2017-06-09'))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleList)
