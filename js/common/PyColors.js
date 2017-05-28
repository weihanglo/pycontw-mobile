export const DARK_TEXT = 'hsl(0, 0%, 24%)'
export const LIGHT_TEXT = 'hsl(0, 0%, 90%)'
export const LIGHT_BACKGROUND = 'hsl(0, 0%, 90%)'
export const ULTRALIGHT_BACKGROUND = 'hsl(0, 0%, 98%)'

export const primary = {
  DARK_BLUE: '#132637',
  MIDDLE_BLUE: '#1697e5',
  LIGHT_BLUE: '#5d91c9',
  ACCENT_ORANGE: '#ff8955',
  ACCENT_GREEN: '#00ff96',
  ACCENT_YELLOW: '#fbda61'
}

export const secondary = {
  DARK_BLUE: '#0e4975',
  MIDDLE_BLUE: '#46c1ea',
  LIGHT_BLUE: '#7fb9cc',
  ACCENT_ORANGE: '#f75b1c',
  ACCENT_GREEN: '#00dfaf',
  ACCENT_YELLOW: '#e5d983'
}

const LOCATION_COLORS = {
  R0: primary.ACCENT_GREEN,
  R1: primary.LIGHT_BLUE,
  R2: primary.ACCENT_YELLOW,
  R4: primary.MIDDLE_BLUE,
  ALL: primary.ACCENT_ORANGE
}

export function colorForLocation (loc) {
  return LOCATION_COLORS[loc]
}

const ROUTE_COLORS = {
  Schedule: primary.MIDDLE_BLUE,
  ScheduleList: primary.MIDDLE_BLUE
}

export function colorForRoute (routeName) {
  return ROUTE_COLORS[routeName]
}
