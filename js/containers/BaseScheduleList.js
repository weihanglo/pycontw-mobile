import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import {fetchEvent} from '../actions/fetchEvent'
import {updateFilter} from '../actions/updateFilter'
import {saveFavorites} from '../actions/saveFavorites'
import ScheduleList from '../components/ScheduleList'

const mapStateToProps = ({
  allSchedules,
  favoriteEvents,
  filter,
  selectDate,
  tagMapping
}) => {
  return {
    error: allSchedules.error,
    favoriteEvents,
    filter,
    isFetching: allSchedules.isFetching,
    tagMapping
  }
}

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
    updateFilter,
    saveFavorites
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleList)
