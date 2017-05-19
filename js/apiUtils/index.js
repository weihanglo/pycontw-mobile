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
      return JSON.parse(detail)
    }

    detail = await this.getTalkDetailRemote(detailId)
    return detail
  },

  async getTalkDetailRemote (detailId) {
    const endpoint = `${BASE_URL}/events/${detailId}.json`
    const response = await fetch(endpoint)
    const detail = await response.json()

    if (detail) {
      await AsyncStorage.setItem(keyGen(detailId), JSON.stringify(detail))
      return detail
    }

    return null
  },

  async getTalkSchedule (date) {
    let schedule = await AsyncStorage.getItem(keyGen(date))
    if (schedule) {
      return JSON.parse(schedule)
    }

    schedule = await this.getTalkScheduleRemote(date)
    return schedule
  },

  async getTalkScheduleRemote (date) {
    const endpoint = `${BASE_URL}/schedule/${date}.json`
    const response = await fetch(endpoint)
    const json = await response.json()
    const schedule = json.slots

    if (schedule) {
      await AsyncStorage.setItem(keyGen(date), JSON.stringify(schedule))
      return schedule
    }

    return null
  }
}

export {ApiUtils as default}
