import processSchedule from './processSchedule'

const rawScheduleData = [
  {
    begin_time: '2017-06-10T01:00:00Z',
    end_time: '2017-06-10T01:10:00Z',
    location: '2-all',
    title: 'Announcement',
    type: 'custom'
  },
  {
    begin_time: '2017-06-10T01:10:00Z',
    end_time: '2017-06-10T02:10:00Z',
    location: '2-all',
    speakers: ['Andrew Godwin'],
    type: 'keynote'
  },
  {
    begin_time: '2017-06-10T02:40:00Z',
    detail_id: '322153690393739347',
    end_time: '2017-06-10T03:10:00Z',
    location: '4-r0',
    speakers: ['Kilik Kuo'],
    title: '[自py系列2] 投資策略驗證系統',
    type: 'talk'
  },
  {
    begin_time: '2017-06-10T02:40:00Z',
    detail_id: '319284977214685262',
    end_time: '2017-06-10T03:10:00Z',
    location: '5-r1',
    speakers: ['Wei Lin'],
    title: 'Elastic Network of Things with MQTT and MicroPython',
    type: 'talk'
  },
  {
    begin_time: '2017-06-10T02:40:00Z',
    end_time: '2017-06-10T03:10:00Z',
    location: '6-r2',
    title: ' ',
    type: 'custom'
  }
]

const groupedScheduleData = [
  {
    key: '09:00',
    data: [
      {
        beginTime: '09:00',
        detailId: '09:00-Announcement',
        endTime: '09:10',
        location: 'ALL',
        title: 'Announcement',
        type: 'custom'
      }
    ]
  }, {
    key: '09:10',
    data: [
      {
        beginTime: '09:10',
        detailId: 'Andrew Godwin',
        endTime: '10:10',
        location: 'ALL',
        speakers: ['Andrew Godwin'],
        title: 'Building for Failure: Learning Lessons from Aviation',
        type: 'keynote'
      }
    ]
  }, {
    key: '10:40',
    data: [
      {
        beginTime: '10:40',
        detailId: '322153690393739347',
        endTime: '11:10',
        location: 'R0',
        speakers: ['Kilik Kuo'],
        title: '[自py系列2] 投資策略驗證系統',
        type: 'talk'
      },
      {
        beginTime: '10:40',
        detailId: '319284977214685262',
        endTime: '11:10',
        location: 'R1',
        speakers: ['Wei Lin'],
        title: 'Elastic Network of Things with MQTT and MicroPython',
        type: 'talk'
      }
    ]
  }
]

it('Should group raw schedule by `beginTime`', () => {
  const grouped = processSchedule(rawScheduleData)
  expect(grouped).toEqual(groupedScheduleData)
})
