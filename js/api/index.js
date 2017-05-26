/* global fetch */
import {AsyncStorage} from 'react-native'

import processEvent from './processEvent'
import processSchedule from './processSchedule'

const BASE_URL = 'https://pycon-630b8.firebaseio.com/pycontw2017'
const STOREKEY = 'pycontw2017'

function keyGen (input) {
  return `@${STOREKEY}:${input}`
}

const Api = {
  async getEvent (eventId) {
    let event = await AsyncStorage.getItem(keyGen(eventId))
    if (event) {
      return JSON.parse(event)
    }

    event = await this.getEventRemote(eventId)
    return event
  },

  async getEventRemote (eventId) {
    const endpoint = `${BASE_URL}/events/${eventId}.json`
    const response = await fetch(endpoint)
    const json = await response.json()
    const event = processEvent(json)

    if (event) {
      await AsyncStorage.setItem(keyGen(eventId), JSON.stringify(event))
      return event
    }

    return null
  },

  async getSchedule (date) {
    let schedule = await AsyncStorage.getItem(keyGen(date))
    if (schedule) {
      return JSON.parse(schedule)
    }

    schedule = await this.getScheduleRemote(date)
    return schedule
  },

  async getScheduleRemote (date) {
    const endpoint = `${BASE_URL}/schedule/${date}.json`
    const response = await fetch(endpoint)
    const json = await response.json()
    const schedule = processSchedule(json.slots)

    if (schedule) {
      await AsyncStorage.setItem(keyGen(date), JSON.stringify(schedule))
      return schedule
    }

    return null
  }
}

export default Api
