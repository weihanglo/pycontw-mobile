import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import EventView from '../components/EventView'

const mapStateToProps = ({selectEvent}) => ({...selectEvent})

const mapDispatchToProps = dispatch => ({
  onAvatarPress: () => {}
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventView)
