/*
  Process event schedule from API call to fit our state logic

 */

import keynotes from './keynotes.json'

const DATE_OPTIONS = {
  hour12: false,
  timeZone: 'Asia/Taipei'
}

function hhmm (date) {
  return new Date(date)
    .toLocaleTimeString('en-US', DATE_OPTIONS)
    .replace(/:\d+$/, '')
}

function getKeynoteTitle (name) {
  return keynotes[name].title
}

export default function (events) {
  // Temporary container for re-mapping data
  const map = {}

  events.forEach(({
      begin_time, detail_id, end_time, location, speakers, title, type
    }) => {
    const noTitle = !title || title === ' '

    // Skip a custom event without any title
    if (type === 'custom' && noTitle) {
      return
    }

    // Store events with identical `beginTime` in the same bag (Array)
    const beginTime = hhmm(begin_time)
    let bag = map[beginTime]
    if (!bag) {
      bag = []
      map[beginTime] = bag
    }

    // Compose missing detail_id
    const isKeynote = type === 'keynote'
    let detailId = detail_id // eslint-disable-line
    if (isKeynote) {
      detailId = speakers[0]
    }
    if (typeof detailId === 'undefined') {
      detailId = `${beginTime}-${title}`
    }

    bag.push({
      beginTime,
      detailId,
      endTime: hhmm(end_time),
      location: location.replace(/.*-/, '').toUpperCase(),
      speakers,
      title: noTitle && isKeynote ? getKeynoteTitle(speakers[0]) : title,
      type
    })
  })

  // Sort events by startTime to construct a real schedule array
  return Object.entries(map)
    .sort((startTimeA, startTimeB) => startTimeA < startTimeB ? -1 : 1)
    .map(e => ({beginTime: e[0], events: e[1]}))
}
