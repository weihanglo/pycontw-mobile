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
import I18n from '../../i18n'

const SCALE_MIN_FACTOR = 0.95

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

  _showMap = false
  _showFilter = false

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
    if (Platform.OS === 'android') { // android shall not have animations
      return
    }
    const toValue = visible ? SCALE_MIN_FACTOR : 1.0
    const duration = 400
    Animated.timing(this.state.scaleAnim, {toValue, duration}).start()
  }

  _onPressMap = () => {
    this._showMap = true
    this._showFilter = false
    this._setModalVisible(true)
  }

  _onPressFilter = () => {
    this._showMap = false
    this._showFilter = true
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
      filter,
      navigation: {state: {routeName}},
      schedule,
      selectedDate,
      selectDate,
      goToSchedule,
      updateFilter,
      style
    } = this.props
    const headerBgColor = Colors.secondary.DARK_BLUE

    // Animated states
    const transform = [{scale: this.state.scaleAnim}]

    const opacity = this.state.scaleAnim.interpolate({
      inputRange: [SCALE_MIN_FACTOR, 1],
      outputRange: [0.5, 1]
    })

    const {modalVisible} = this.state

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
          animationType={Platform.OS === 'ios' ? 'slide' : 'fade'}
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => this._setModalVisible(false)}
        >
          {(() => {
            if (this._showMap) {
              return (
                <Map
                  onDone={tags => { this._setModalVisible(false) }}
                  headerProps={{
                    isModal: true,
                    style: {backgroundColor: headerBgColor}
                  }}
                />
              )
            }

            if (this._showFilter) {
              return (
                <Filter
                  filter={filter}
                  // Only calcuate tags when visible
                  tags={modalVisible ? this._getUniqueTags() : []}
                  headerProps={{
                    isModal: true,
                    style: {backgroundColor: headerBgColor}
                  }}
                  onDone={tags => {
                    updateFilter(tags)
                    this._setModalVisible(false)
                  }}
                />
              )
            }
          })()}
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
