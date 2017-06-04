import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import moment from 'moment'
import I18n from 'react-native-i18n'

import {saveFavorites} from '../actions/saveFavorites'
import EventView from '../components/EventView'

if (I18n.locale.match(/zh/)) {
  moment.locale('zh', {
    relativeTime: {
      mm: '%d 分鐘',
      h: '1 小時',
      hh: '%d 小時'
    }
  })
}

const mapStateToProps = (
  {selectedDate, selectEvent, favoriteEvents, allDates: {dates}}, // store state
  {navigation: {state: {params: {location, beginTime, endTime}}}} // ownProps
) => {
  // Calculate human-readable datetime
  // TODO: handle locale
  const begin = moment(beginTime, 'hh:mm')
  const end = moment(endTime, 'hh:mm')
  const duration = moment.duration(end.diff(begin)).locale('zh').humanize()
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
