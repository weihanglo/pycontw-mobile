import {StackNavigator} from 'react-navigation'

import ScheduleList from '../containers/ScheduleList'
import EventView from '../containers/EventView'
import SpeakerView from '../containers/SpeakerView'

export default StackNavigator({
  ScheduleList: {screen: ScheduleList},
  Event: {screen: EventView},
  Speaker: {screen: SpeakerView}
}, {
  initialRouteName: 'ScheduleList'
})
