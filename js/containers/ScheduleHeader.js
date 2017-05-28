// This component is also a presentational component
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {StyleSheet, TouchableHighlight, View} from 'react-native'

import {Heading5} from '../common/PyText'
import Header from '../common/PyHeader'

import {selectDate} from '../actions/selectDate'

class ScheduleHeader extends React.Component {
  static propTypes = {
    dates: PropTypes.arrayOf(PropTypes.string),
    selectDate: PropTypes.string,
    onSelectDate: PropTypes.func
  }

  _borderWidthByDate = date => ({
    borderColor: this.props.selectDate === date
      ? 'hsl(273, 75%, 33%)'
      : 'transparent'
  })

  render () {
    const {dates, onSelectDate} = this.props
    return (
      <View>
        <Header />
        <View style={styles.tabbar}>
          {dates && dates.map((date, index) => (
            <TouchableHighlight
              key={date}
              onPress={() => onSelectDate(date)}
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

// Redux container part ----------------

const mapStateToProps = ({allSchedules: {dates}, selectDate}) => ({
  selectDate,
  dates
})

const mapDispatchToProps = dispatch => ({
  onSelectDate: date => {
    dispatch(selectDate(date))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleHeader)
