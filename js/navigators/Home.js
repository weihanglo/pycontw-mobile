import {StackNavigator} from 'react-navigation'

import ScheduleList from '../containers/ScheduleList'
import EventView from '../containers/EventView'
import SpeakerView from '../containers/SpeakerView'

export default StackNavigator({
  HomeScheduleList: {screen: ScheduleList},
  HomeEvent: {screen: EventView},
  HomeSpeaker: {screen: SpeakerView}
}, {
  initialRouteName: 'HomeScheduleList'
})
