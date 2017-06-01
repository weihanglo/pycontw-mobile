/* global fetch */
import {AsyncStorage} from 'react-native'

import processEvent from './processEvent'
import processSchedule from './processSchedule'

const BASE_URL = 'https://pycon-630b8.firebaseio.com/pycontw2017'
const STOREKEY = 'pycontw2017'

const FAVORITE_EVENTS = 'FAVORITE_EVENTS'

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

  async getTagMapping () {
    const endpoint = `${BASE_URL}/events.json`
    const response = await fetch(endpoint)
    const json = await response.json()

    const mapping = {}

    Object.entries(json).forEach(([
      id, {
        category,
        python_level: level,
        recording_policy: recoding
      }
    ]) => {
      const tags = []
      category && tags.push(category)
      level && tags.push(level)
      recoding || tags.push('NO-REC')
      mapping[id] = tags
    })

    return mapping
  },

  async getAllSchedules () {
    const endpoint = `${BASE_URL}/schedule.json`
    const response = await fetch(endpoint)
    const json = await response.json()

    const schedules = {}

    Object.values(json)
      .forEach(obj => { schedules[obj.date] = processSchedule(obj.slots) })

    return schedules
  },

  // Load/save all favorite events -------------

  async saveFavorites (eventIds) {
    const key = keyGen(FAVORITE_EVENTS)
    await AsyncStorage.setItem(key, JSON.stringify(eventIds))
  },

  async loadFavorites () {
    const key = keyGen(FAVORITE_EVENTS)
    const eventIds = await AsyncStorage.getItem(key)
    if (eventIds) {
      return JSON.parse(eventIds)
    }
  }
}

export default Api
