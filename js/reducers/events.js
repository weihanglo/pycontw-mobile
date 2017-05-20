const OPTIONS = {
  hour12: false,
  timeZone: 'Asia/Taipei'
}

function hhmm (date) {
  return new Date(date)
    .toLocaleTimeString('en-US', OPTIONS)
    .replace(/:\d+$/, '')
}

export default function (state, action) {
  if (action.type !== 'SCHEDULE_LOADED') {
    return state
  }

  const map = {}

  action.schedule.forEach(event => {
    const {
      begin_time,
      end_time,
      location,
      detail_Id,
      type,
      title,
      ...props
    } = event

    // if `type` is custom and no `title` (' ' string of length 1),
    // skip this event
    if (type === 'custom' && (!title || title === ' ')) {
      return
    }

    const beginTime = hhmm(begin_time)
    let bag = map[beginTime]
    if (!bag) {
      bag = []
      map[beginTime] = bag
    }

    bag.push({
      key: detail_Id || `${beginTime}-${title}`, // eslint-disable-line
      data: {
        beginTime,
        endTime: hhmm(end_time),
        location: location.replace(/.*-/, '').toUpperCase(),
        detailId: detail_Id,
        title: title === undefined ? type : title,
        ...props
      }
    })
  })

  const events = Object.entries(map)
    .sort((a, b) => a < b)
    .map(e => ({key: e[0], data: e[1]}))
  return events
}
