/*
  Process event schedule from API call to fit our state logic
 */
import moment from 'moment'
import sponsoredTalkTitles from './data/sponsoredTalkTitles.json'

export default function (events) {
  // Temporary container for re-mapping data
  const map = {}

  // A hashmap to check if this event is added or not
  // (fxxk duplicated data)
  const eventIds = {}

  events.forEach(({
      begin_time,
      detail_id,
      end_time,
      location,
      speakers,
      title,
      type
    }) => {
    const noTitle = !title || title === ' '

    // Skip a custom event without any title
    if (type === 'custom' && noTitle) {
      return
    }

    var newTitle = title
    if (type === 'sponsored_talk' && noTitle) {
      newTitle = sponsoredTalkTitles[speakers[0]] || 'Invited Event'
    }

    // Store events with identical `beginTime` in the same bag (Array)
    const beginTime = moment(begin_time).format('HH:mm')
    let bag = map[beginTime]
    if (!bag) {
      bag = []
      map[beginTime] = bag
    }

    // Compose missing detail_id
    const isKeynote = type === 'keynote'
    let eventId = detail_id // eslint-disable-line
    if (isKeynote) {
      eventId = speakers[0]
      newTitle = `Keynote: ${speakers[0]}`
    }
    if (typeof eventId === 'undefined') {
      eventId = `${beginTime}-${title}` // just a rule for unique key
    }

    // Data should be unique
    if (eventIds[eventId]) {
      return
    }
    eventIds[eventId] = true

    bag.push({
      beginTime,
      eventId,
      endTime: moment(end_time).format('HH:mm'),
      location: location.replace(/.*-/, '').toUpperCase(),
      speakers,
      title: newTitle,
      type
    })
  })

  // Sort events by startTime to construct a real schedule array
  return Object.entries(map)
    .sort((startTimeA, startTimeB) => startTimeA < startTimeB ? -1 : 1)
    .map(e => ({key: e[0], data: e[1]}))
}
