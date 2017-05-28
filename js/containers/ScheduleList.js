import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import {fetchSchedules} from '../actions/fetchSchedules'
import {fetchEvent} from '../actions/fetchEvent'
import ScheduleList from '../components/ScheduleList'

const mapStateToProps = ({
  allSchedules,
  favoriteEvents,
  selectDate
}) => ({
  error: allSchedules.error,
  date: selectDate,
  favoriteEvents,
  isFetching: allSchedules.isFetching,
  schedule: allSchedules[selectDate]
})

const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch(fetchSchedules())
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
