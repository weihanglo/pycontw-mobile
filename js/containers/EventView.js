import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import moment from 'moment'
import 'moment/locale/zh-tw'
import I18n from 'react-native-i18n'

import {saveFavorites} from '../actions/saveFavorites'
import {preferMarkdown} from '../actions/preferMarkdown'
import EventView from '../components/EventView'

if (I18n.locale.match(/zh/)) {
  moment.locale('zh-tw')
} else if (I18n.locale.match(/en/)) {
  moment.locale('en-us')
}

const mapStateToProps = (
  // store state
  {selectedDate, selectEvent, useMarkdown, favoriteEvents, allDates: {dates}},
  // ownProps
  {navigation: {state: {params: {location, beginTime, endTime}}}}
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
    hhmmTime: begin.format('HH:mm'),
    useMarkdown
  }
}

const mapDispatchToProps = dispatch => ({
  goBack: () => { dispatch(NavigationActions.back()) },
  ...bindActionCreators({
    saveFavorites,
    preferMarkdown
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventView)
