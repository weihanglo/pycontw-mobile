import {connect} from 'react-redux'

import SpeakerView from '../components/SpeakerView'

const mapStateToProps = ({selectEvent: {event}}, {navigation: {state}}) => {
  const {speakerName} = state.params
  return event.speakers
    .filter(speaker => speaker.name === speakerName)[0]
}

export default connect(
  mapStateToProps
)(SpeakerView)
