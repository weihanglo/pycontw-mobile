// This component is also a presentaional component

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {StyleSheet, TouchableHighlight, View} from 'react-native'

import {Heading5} from '../common/PyText'

import {selectDate} from '../actions/selectDate'
import {fetchSchedule} from '../actions/fetchSchedule'
import Header from '../common/PyHeader'

class ScheduleHeader extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    selectDate: PropTypes.string,
    onSelectDate: PropTypes.func
  }

  _onPress = date => {
    if (this.props.isFetching) {
      return
    }
    this.props.onSelectDate(date)
  }

  _borderWidthByDate = date => ({
    borderColor: this.props.selectDate === date
      ? 'hsl(273, 75%, 33%)'
      : 'transparent'
  })

  render () {
    const dates = ['2017-06-09', '2017-06-10', '2017-06-11']
    return (
      <View>
        <Header />
        <View style={styles.tabbar}>
          {dates.map((date, index) => (
            <TouchableHighlight
              key={date}
              onPress={() => this._onPress(date)}
              style={[styles.tab, this._borderWidthByDate(date)]}
              underlayColor='#dddddd'
            >
              <View >
                <Heading5>Day {index + 1}</Heading5>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({scheduleByDate: {isFetching}, selectDate}) => ({
  isFetching,
  selectDate
})

const mapDispatchToProps = dispatch => ({
  onSelectDate: date => {
    dispatch(selectDate(date))
    dispatch(fetchSchedule(date))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleHeader)

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  tab: {
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 2,
    paddingHorizontal: 3,
    margin: 8,
    height: 40
  }
})
