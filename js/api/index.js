/* global fetch */
import {AsyncStorage} from 'react-native'
import I18n from 'react-native-i18n'

import processEvent from './processEvent'
import processSchedule from './processSchedule'
import keynotes from './data/keynotes'

const BASE_URL = 'https://pycon-630b8.firebaseio.com/pycontw2017'
const GENERAL_STORE = 'pycontw2017'

// subkeys in general store
const EVENT_TAG_MAPPING = 'EVENT_TAG_MAPPING'
const EVENT_LOADED = 'EVENT_LOADED' // flag to imply events is loaded or not
const SCHEDULE_DATES = 'SCHEDULE_DATES'
const FAVORITE_EVENTS = 'FAVORITE_EVENTS'

function keyGen (input) {
  return `@${GENERAL_STORE}:${input}`
}

function extractTags ({category, level, recording = true}) {
  const tags = []
  category && tags.push(category)
  level && tags.push(level)
  recording || tags.push('NO-REC')
  return tags
}

function fetchTimeout (uri, options, timeout = 5000) {
  return Promise.race([
    fetch(uri, options),
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error('Request Timeout')), timeout)
    })
  ]).then(res => {
    if (res.status !== 200) {
      return Promise.reject(new Error(`Request failed: ${res.status}`))
    }
    return res
  })
}

// -------------------------------------
// Main Api object
// -------------------------------------

const Api = {
  // Storage APIs ----------------------

  async getSchedule (date) {
    let schedule = await AsyncStorage.getItem(keyGen(date))
    if (schedule) {
      return JSON.parse(schedule)
    }
    throw new Error(`Failure of fetching schedule ${schedule}`)
  },

  async getEvent (eventId) {
    let event = await AsyncStorage.getItem(keyGen(eventId))
    if (event) {
      return JSON.parse(event)
    }
    throw new Error(`Failure of fetching event ${eventId}`)
  },

  async getTagMapping () {
    const mapping = await AsyncStorage.getItem(keyGen(EVENT_TAG_MAPPING))
    if (mapping) {
      return JSON.parse(mapping)
    }
    throw new Error('Failure of fetching mapping')
  },

  async getDates () {
    const dates = await AsyncStorage.getItem(keyGen(SCHEDULE_DATES))
    if (dates) {
      return JSON.parse(dates)
    }
    throw new Error('Failure of fetching dates')
  },

  async saveFavorites (eventIds) {
    await AsyncStorage.setItem(
      keyGen(FAVORITE_EVENTS),
      JSON.stringify(eventIds)
    )
  },

  async loadFavorites () {
    const eventIds = await AsyncStorage.getItem(keyGen(FAVORITE_EVENTS))
    if (eventIds) {
      return JSON.parse(eventIds)
    }
    throw new Error('Failure of fetching mapping')
  },

  // Synchronization -------------------

  /*
    This method have no return value, only persist events.
    Additional, this method also update event-tag mapping.
   */
  async syncAllEvents (options) {
    let events

    // Determine the source of data (remote or bundled/storage)
    if (options && options.remote) {
      const endpoint = `${BASE_URL}/events.json`
      const response = await fetchTimeout(endpoint)
      events = await response.json()
    } else {
      const isEventLoaded = await AsyncStorage.getItem(keyGen(EVENT_LOADED))
      // Early return if events have been persisted.
      if (isEventLoaded) { return }

      events = require('./data/events.json')
    }

    // Collect event-tag mapping
    events = Object.entries(events)
    if (!events || events.length <= 0) {
      return new Error('Invalid Response data')
    }

    const tagMapping = {}

    for (let [eventId, event] of events) {
      const processed = processEvent(event)
      tagMapping[eventId] = extractTags(processed)

      await AsyncStorage.setItem(
        keyGen(eventId),
        JSON.stringify(processed)
      )
    }

    // Process-free keynotes data
    var key = keynotes.en
    if (I18n.locale.match(/zh/)) {
      key = keynotes.zh
    }
    for (let [eventId, event] of Object.entries(key)) {
      tagMapping[eventId] = extractTags(event)

      await AsyncStorage.setItem(
        keyGen(eventId),
        JSON.stringify(event)
      )
    }

    // Persist tagMapping
    await AsyncStorage.setItem(
      keyGen(EVENT_TAG_MAPPING),
      JSON.stringify(tagMapping)
    )

    // Set the flag to imply the events are persisted.
    await AsyncStorage.setItem(keyGen(EVENT_LOADED), EVENT_LOADED)
  },

  async syncAllSchedules (options) {
    let json

    if (options && options.remote) {
      const endpoint = `${BASE_URL}/schedule.json`
      const response = await fetchTimeout(endpoint)
      json = await response.json()
    } else { // Check local
      let dates = await AsyncStorage.getItem(keyGen(SCHEDULE_DATES))
      dates = JSON.parse(dates)

      // Early return if schedules have been persisted.
      if (Array.isArray(dates)) {
        // return
      }

      // Load from pre-bundled data
      json = require('./data/schedule.json')
    }

    // json is invalid if not data provided
    if (!json) {
      return new Error('Invalid Response data')
    }

    // If got pre-bundled or remote data, we should process them.
    const dates = []

    for (let obj of Object.values(json)) {
      const processed = processSchedule(obj.slots)
      dates.push(obj.date)
      await AsyncStorage.setItem(
        keyGen(obj.date),
        JSON.stringify(processed)
      )
    }

    // Store dates of this conference
    await AsyncStorage.setItem(
      keyGen(SCHEDULE_DATES),
      JSON.stringify(dates)
    )
  }

}

export default Api
