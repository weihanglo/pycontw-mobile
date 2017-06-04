// This presentational + container component
import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  ViewPropTypes
} from 'react-native'

import {Heading5} from '../../common/PyText'
import PyHeader from '../../common/PyHeader'
import * as Colors from '../../common/PyColors'

export default class extends React.Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    dates: PropTypes.arrayOf(PropTypes.string),
    selectedDate: PropTypes.string,
    selectDate: PropTypes.func,
    onPressMap: PropTypes.func,
    onPressFilter: PropTypes.func,
    style: ViewPropTypes.style
  }

  state ={
    modalVisible: false
  }

  _borderWidthByDate = date => ({
    borderColor: this.props.selectedDate === date
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
      selectDate,
      onPressMap,
      onPressFilter,
      style,
      ...props
    } = this.props
    const leftItem = (
      <PyHeader.MapButton
        onPress={onPressMap}
        color={Colors.LIGHT_TEXT}
      />
    )
    const rightItem = (
      <PyHeader.FilterButton
        onPress={onPressFilter}
        color={Colors.LIGHT_TEXT}
      />
    )

    return (
      <View style={[{backgroundColor}, style]}>
        <PyHeader
          leftItem={leftItem}
          titleColor={Colors.LIGHT_TEXT}
          rightItem={rightItem}
          {...props}
        />

        <View style={styles.tabbar}>
          {dates && dates.map((date, index) => (
            <TouchableHighlight
              key={date}
              onPress={() => selectDate(date)}
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
