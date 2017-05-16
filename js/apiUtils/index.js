/* global fetch */

import {AsyncStorage} from 'react-native'

const BASE_URL = 'https://pycon-630b8.firebaseio.com/pycontw2017'

const STOREKEY = 'pycontw2017'

function keyGen (input) {
  return `@${STOREKEY}:${input}`
}

const ApiUtils = {
  async getTalkDetail (detailId) {
    let detail = await AsyncStorage.getItem(keyGen(detailId))
    if (detail) {
      return detail
    }
    detail = await this.getTalkDetailRemote(detailId)
    return detail
  },

  async getTalkDetailRemote (detailId) {
    const endpoint = `${BASE_URL}/events/${detailId}.json`
    const detail = await fetch(endpoint).then(res => res.json())

    if (detail) {
      await AsyncStorage.setItem(keyGen(detailId), JSON.stringify(detail))
      return detail
    }

    return null
  },

  async getTalkSchedule (date) {
    let schedule = await AsyncStorage.getItem(keyGen(date))
    if (schedule) {
      return schedule
    }
    schedule = await this.getTalkScheduleRemote(date)
    return schedule
  },

  async getTalkScheduleRemote (date) {
    const endpoint = `${BASE_URL}/schedule/${date}.json`
    const schedule = await fetch(endpoint)
      .then(res => res.json())
      .then(json => json.slots)

    if (schedule) {
      await AsyncStorage.setItem(keyGen(date), JSON.stringify(schedule))
      return schedule
    }

    return null
  }
}

export {ApiUtils as default}
