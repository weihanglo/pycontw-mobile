import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import moment from 'moment'
import 'moment/locale/zh-tw'
import I18n from 'react-native-i18n'

import {saveFavorites} from '../actions/saveFavorites'
import EventView from '../components/EventView'

if (I18n.locale.match(/zh/)) {
  moment.locale('zh-tw')
} else if (I18n.locale.match(/en/)) {
  moment.locale('en-us')
}

const mapStateToProps = (
  {selectedDate, selectEvent, favoriteEvents, allDates: {dates}}, // store state
  {navigation: {state: {params: {location, beginTime, endTime}}}} // ownProps
) => {
  // Calculate human-readable datetime
  const begin = moment(beginTime, 'hh:mm')
  const end = moment(endTime, 'hh:mm')
  const duration = moment.duration(end.diff(begin)).humanize()
  return {
    ...selectEvent,
    location,
    duration,
    favoriteEvents,
    dayIndex: dates.indexOf(selectedDate),
    hhmmTime: begin.format('HH:mm')
  }
}

const mapDispatchToProps = dispatch => ({
  goBack: () => { dispatch(NavigationActions.back()) },
  ...bindActionCreators({saveFavorites}, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventView)
