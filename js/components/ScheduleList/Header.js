// This presentational + container component
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  ViewPropTypes
} from 'react-native'

import {Heading5} from '../../common/PyText'
import PyHeader from '../../common/PyHeader'
import * as Colors from '../../common/PyColors'
import {selectDate} from '../../actions/selectDate'

class Header extends React.Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    dates: PropTypes.arrayOf(PropTypes.string),
    selectDate: PropTypes.string,
    onSelectDate: PropTypes.func,
    onFilterPress: PropTypes.func,
    style: ViewPropTypes.style
  }

  state ={
    modalVisible: false
  }

  _borderWidthByDate = date => ({
    borderColor: this.props.selectDate === date
      ? Colors.LIGHT_TEXT
      : 'transparent'
  })

  _setModalVisible (visible) {
    this.setState({modalVisible: visible})
  }

  render () {
    const {
      backgroundColor,
      dates,
      onSelectDate,
      onFilterPress,
      style,
      ...props
    } = this.props
    const rightItem = (
      <PyHeader.FilterButton
        onPress={onFilterPress}
        color={Colors.LIGHT_TEXT}
      />
    )

    return (
      <View style={[{backgroundColor}, style]}>
        <PyHeader
          titleColor={Colors.LIGHT_TEXT}
          rightItem={rightItem}
          {...props}
        />
        <View style={styles.tabbar}>
          {dates && dates.map((date, index) => (
            <TouchableHighlight
              key={date}
              onPress={() => onSelectDate(date)}
              style={[styles.tab, this._borderWidthByDate(date)]}
              underlayColor='rgba(0, 0, 0, 0.10)'
            >
              <View>
                <Heading5 style={styles.tabText}>Day {index + 1}</Heading5>
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
    justifyContent: 'center',
    height: 50
  },
  tab: {
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 2,
    paddingHorizontal: 8,
    margin: 8
  },
  tabText: {
    color: Colors.LIGHT_TEXT
  }
})

// react-redux part --------------------

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
)(Header)
