const ROUTE_TITLE = {
  Schedule: 'Schedule',
  ScheduleList: 'Schedule',
  My: 'My PyCon',
  MyScheduleList: 'My PyCon',
  About: 'About',
  AboutView: 'About'
}

export function titleForRoute (routeName) {
  return ROUTE_TITLE[routeName]
}
