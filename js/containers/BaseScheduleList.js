import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import {fetchSchedule} from '../actions/fetchSchedule'
import {fetchEvent} from '../actions/fetchEvent'
import {updateFilter} from '../actions/updateFilter'
import {saveFavorites} from '../actions/saveFavorites'
import {selectDate} from '../actions/selectDate'
import ScheduleList from '../components/ScheduleList'

const mapStateToProps = ({
  allDates: {dates},
  schedule: {isFetching},
  favoriteEvents,
  filter,
  selectedDate,
  syncState: {isSyncing, error},
  tagMapping
}) => ({
  dates,
  error,
  favoriteEvents,
  filter,
  isFetching,
  tagMapping,
  selectedDate,
  syncCompleted: !isSyncing && !error
})

const mapDispatchToProps = (dispatch, {navigation: {state}}) => ({
  onCellPress: (eventId, location, beginTime, endTime) => {
    // Figure out where to navigate based on where it came from
    const {routeName: currentRoute} = state
    let routeName = 'Event'
    if (currentRoute === 'MyScheduleList') {
      routeName = 'MyEvent'
    }

    dispatch(fetchEvent(eventId))
    dispatch(NavigationActions.navigate({
      routeName,
      params: {location, beginTime, endTime}
    }))
  },
  ...bindActionCreators({
    fetchSchedule,
    selectDate,
    updateFilter,
    saveFavorites
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleList)
