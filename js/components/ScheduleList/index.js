import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  LayoutAnimation,
  Modal,
  Platform,
  SectionList,
  StyleSheet,
  TouchableHighlight,
  View,
  ViewPropTypes
} from 'react-native'

import {Heading3, Heading5} from '../../common/PyText'
import * as Colors from '../../common/PyColors'
import Map from '../../common/PyMap'
import {titleForRoute} from '../../common/PyConstants'
import Cell from './Cell'
import Header from './Header'
import Filter from './Filter'
import TagPopover from './TagPopover'
import I18n from '../../i18n'

const SCALE_MIN_FACTOR = 0.95

const MODAL_MAP = 'MODAL_MAP'
const MODAL_FILTER = 'MODAL_FILTER'
const MODAL_TAGPOPOVER = 'MODAL_TAGPOPOVER'

export default class extends React.Component {
  static propTypes = {
    dates: PropTypes.arrayOf(PropTypes.string),
    favoriteEvents: PropTypes.objectOf(PropTypes.bool),
    filter: PropTypes.objectOf(PropTypes.bool),
    isFetching: PropTypes.bool,
    schedule: PropTypes.array,
    selectedDate: PropTypes.string,
    tagMapping: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    syncCompleted: PropTypes.bool,
    fetchSchedule: PropTypes.func,
    goToSchedule: PropTypes.func, // for MyScheduleList only
    onCellPress: PropTypes.func,
    saveFavorites: PropTypes.func,
    selectDate: PropTypes.func,
    updateFilter: PropTypes.func,
    navigation: PropTypes.object,
    style: ViewPropTypes.style
  }

  state = {
    modalVisible: false,
    scaleAnim: new Animated.Value(1)
  }

  _modalName
  _modalTagParams

  componentWillReceiveProps (nextProps) {
    const {fetchSchedule, selectedDate, syncCompleted, isFetching} = nextProps

    if (isFetching) {
      return
    }

    if (syncCompleted && !this.props.syncCompleted) {
      fetchSchedule(selectedDate)
      return
    }

    if (selectedDate !== this.props.selectedDate) {
      this._changeDate = true
      fetchSchedule(selectedDate)
    }
  }

  componentWillUpdate () {
    if (Platform.OS === 'android') { // android shall not have animations
      return
    }
    const {Types, Properties, create} = LayoutAnimation
    const config = create(250, Types.easeInEaseOut, Properties.opacity)
    LayoutAnimation.configureNext(config)
  }

  _setModalVisible = visible => {
    this.setState({modalVisible: visible})
     // android shall not have animations
    if (Platform.OS === 'android' || this._modalName === MODAL_TAGPOPOVER) {
      return
    }
    const toValue = visible ? SCALE_MIN_FACTOR : 1.0
    const duration = 400
    Animated.timing(this.state.scaleAnim, {toValue, duration}).start()
  }

  _onPressMap = () => {
    this._modalName = MODAL_MAP
    this._setModalVisible(true)
  }

  _onPressFilter = () => {
    this._modalName = MODAL_FILTER
    this._setModalVisible(true)
  }

  _onPressTag = (tag, nativeEvent) => {
    this._modalName = MODAL_TAGPOPOVER
    this._modalTagParams = {tag, nativeEvent}
    this._setModalVisible(true)
  }

  _onCellPress ({eventId, location, beginTime, endTime}) {
    this.props.onCellPress(eventId, location, beginTime, endTime)
  }

  _toggleCheck = eventId => {
    const {saveFavorites, favoriteEvents} = this.props
    const checked = favoriteEvents[eventId]
    if (checked) {
      const newFavors = {...favoriteEvents}
      delete newFavors[eventId]
      saveFavorites(newFavors)
      return
    }
    saveFavorites({...favoriteEvents, [eventId]: true})
  }

  _renderModalContent = () => {
    const backgroundColor = Colors.secondary.DARK_BLUE
    switch (this._modalName) {
      case MODAL_MAP:
        return (
          <Map
            onDone={() => { this._setModalVisible(false) }}
            headerProps={{isModal: true, style: {backgroundColor}}}
          />
        )
      case MODAL_FILTER:
        return (
          <Filter
            filter={this.props.filter}
            tags={this._getUniqueTags()}
            headerProps={{isModal: true, style: {backgroundColor}}}
            onDone={tags => {
              this.props.updateFilter(tags)
              this._setModalVisible(false)
            }}
          />
        )
      case MODAL_TAGPOPOVER:
        const {pageX: x, pageY: y} = this._modalTagParams.nativeEvent
        return (
          <TagPopover
            tag={this._modalTagParams.tag}
            point={{x, y}}
            onDone={() => { this._setModalVisible(false) }}
          />
        )
      default:
        break
    }
  }

  _renderItem = ({item}) => {
    const {eventId, type} = item
    const checked = !!this.props.favoriteEvents[eventId]
    // HACK to check type is `CUSTOM`
    const tags = this.props.tagMapping[eventId] || [type.toUpperCase()]
    return (
      <TouchableHighlight onPress={() => this._onCellPress(item)}>
        <View>
          <Cell
            {...item}
            tags={tags}
            checked={checked}
            toggleCheck={this._toggleCheck}
            onPressTag={this._onPressTag}
          />
        </View>
      </TouchableHighlight>
    )
  }

  _renderSectionHeader = ({section}) => {
    if (!section.data || section.data.length === 0) {
      return null
    }
    return (
      <View style={styles.sectionHeader}>
        <Heading5 style={styles.sectionHeaderText}>
          {section.key}
        </Heading5>
      </View>
    )
  }

  _getUniqueTags = () => {
    const uniqueTags = {}
    Object.values(this.props.tagMapping)
      .forEach(tags => {
        tags.forEach(tag => { uniqueTags[tag] = true })
      })
    // HACK: harcode added two categories
    uniqueTags['KEYNOTE'] = true
    uniqueTags['CUSTOM'] = true
    return Object.keys(uniqueTags)
  }

  render () {
    const {
      dates,
      navigation: {state: {routeName}},
      schedule,
      selectedDate,
      selectDate,
      goToSchedule,
      style
    } = this.props

    // Animated states
    const transform = [{scale: this.state.scaleAnim}]

    const opacity = this.state.scaleAnim.interpolate({
      inputRange: [SCALE_MIN_FACTOR, 1],
      outputRange: [0.5, 1]
    })

    const isEmpty = !schedule || schedule.length === 0
    return (
      <View style={[styles.container, style]}>

        <Animated.View style={{flex: 1, transform, opacity}}>
          <Header
            dates={dates}
            color={Colors.colorForRoute(routeName)}
            selectedDate={selectedDate}
            selectDate={selectDate}
            centerItem={titleForRoute(routeName)}
            backgroundColor={Colors.secondary.DARK_BLUE}
            onPressMap={this._onPressMap}
            onPressFilter={this._onPressFilter}
          />
          {!isEmpty && (
            <SectionList
              style={{overflow: 'hidden'}}
              renderItem={this._renderItem}
              renderSectionHeader={this._renderSectionHeader}
              keyExtractor={item => item.eventId}
              sections={schedule}
              removeClippedSubviews={false} // HACK: React Native issue #13316
            />
          )}
          {routeName === 'MyScheduleList' && isEmpty && (
            <View style={styles.addEventWrapper}>
              <TouchableHighlight
                style={[styles.addEventButton,
                  {backgroundColor: Colors.colorForRoute(routeName)}
                ]}
                onPress={goToSchedule}
                underlayColor='rgba(0, 0, 0, 0.10)'
              >
                <View>
                  <Heading3 style={styles.addEventHeading}>
                    {I18n.t('Add Event!')}
                  </Heading3>
                </View>
              </TouchableHighlight>
            </View>
          )}

        </Animated.View>

        <Modal
          animationType={this._modalName === MODAL_TAGPOPOVER
            ? 'fade' : 'slide'}
          transparent={this._modalName === MODAL_TAGPOPOVER}
          visible={this.state.modalVisible}
          onRequestClose={() => this._setModalVisible(false)}
        >
          {this._renderModalContent()}
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(0, 0%, 100%)'
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Colors.LIGHT_BACKGROUND
  },
  sectionHeaderText: {
    color: Colors.secondary.DARK_BLUE
  },
  addEventWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addEventButton: {
    borderRadius: 10,
    padding: 8
  },
  addEventHeading: {
    textAlign: 'center',
    overflow: 'hidden'
  }
})
