import I18n from '../i18n'
const ROUTE_TITLE = {
  Schedule: I18n.t('Schedule'),
  ScheduleList: I18n.t('Schedule'),
  My: I18n.t('My PyCon'),
  MyScheduleList: I18n.t('My PyCon'),
  About: I18n.t('About'),
  AboutView: I18n.t('About')
}

export function titleForRoute (routeName) {
  return ROUTE_TITLE[routeName]
}
