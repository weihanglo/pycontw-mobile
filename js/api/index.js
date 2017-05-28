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

  async getAllSchedules () {
    const endpoint = `${BASE_URL}/schedule.json`
    const response = await fetch(endpoint)
    const json = await response.json()

    const schedules = {}

    Object.values(json)
      .forEach(obj => { schedules[obj.date] = processSchedule(obj.slots) })

    return schedules
  }
}

export default Api
