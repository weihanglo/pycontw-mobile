// This presentational + container component
import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewPropTypes
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import {Heading5, SmallText} from '../../common/PyText'
import PyHeader from '../../common/PyHeader'
import * as Colors from '../../common/PyColors'
import categoryMapping from '../../i18n/categoryMapping'
import I18n from '../../i18n'

export default class extends React.Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    dates: PropTypes.arrayOf(PropTypes.string),
    color: PropTypes.string,
    filter: PropTypes.objectOf(PropTypes.bool),
    selectedDate: PropTypes.string,
    selectDate: PropTypes.func,
    onPressMap: PropTypes.func,
    onPressFilter: PropTypes.func,
    onResetFilter: PropTypes.func,
    style: ViewPropTypes.style
  }

  state ={
    modalVisible: false
  }

  _borderWidthByDate = date => ({
    borderColor: this.props.selectedDate === date
      ? this.props.color
      : 'transparent'
  })

  _setModalVisible (visible) {
    this.setState({modalVisible: visible})
  }

  render () {
    const {
      backgroundColor,
      color,
      dates,
      filter,
      selectDate,
      onPressMap,
      onPressFilter,
      onResetFilter,
      style,
      ...props
    } = this.props
    const leftItem = (
      <PyHeader.MapButton
        onPress={onPressMap}
        color={color}
      />
    )
    const rightItem = (
      <PyHeader.FilterButton
        onPress={onPressFilter}
        color={color}
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
              underlayColor='rgba(255, 255, 255, 0.20)'
            >
              <View>
                <Heading5 style={styles.tabText}>
                  {I18n.t(`Day ${index + 1}`)}
                </Heading5>
              </View>
            </TouchableHighlight>
          ))}
        </View>

        {Object.values(filter).some(e => e) && (
          <View style={styles.filterReminder}>
            <SmallText style={styles.filterText} numberOfLines={1}>
              {I18n.t('Filter: ')}
              {Object.keys(filter).map(k => categoryMapping[k]).join(I18n.t(', '))}
            </SmallText>
            <TouchableOpacity style={styles.filterClose} onPress={onResetFilter}>
              <Icon name='close' size={16} />
            </TouchableOpacity>
          </View>
        )}
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
  },
  filterReminder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary.MIDDLE_BLUE
  },
  filterText: {
    flex: 1,
    paddingLeft: 15,
    color: Colors.LIGHT_TEXT
  },
  filterClose: {
    flexBasis: 40,
    height: 40,
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
