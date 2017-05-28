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
  ScheduleList: primary.MIDDLE_BLUE,
  My: secondary.LIGHT_BLUE,
  MyScheduleList: secondary.LIGHT_BLUE
}

export function colorForRoute (routeName) {
  return ROUTE_COLORS[routeName]
}

const TAGS_COLORS = {
  ADMIN: primary.DARK_BLUE,
  COM: primary.MIDDLE_BLUE,
  CORE: primary.LIGHT_BLUE,
  DATA: primary.ACCENT_ORANGE,
  EDU: primary.ACCENT_ORANGE,
  EMBED: primary.ACCENT_YELLOW,
  FIN: secondary.DARK_BLUE,
  GAME: secondary.MIDDLE_BLUE,
  GRAPH: secondary.LIGHT_BLUE,
  INTNL: secondary.ACCENT_ORANGE,
  LIBS: secondary.ACCENT_GREEN,
  OTHER: secondary.ACCENT_YELLOW,
  PRAC: primary.DARK_BLUE,
  SCI: primary.MIDDLE_BLUE,
  SEC: primary.LIGHT_BLUE,
  WEB: primary.ACCENT_ORANGE,

  // HACK add these
  CUSTOM: secondary.ACCENT_GREEN,
  'NO-REC': primary.ACCENT_YELLOW,
  KEYNOTE: secondary.DARK_BLUE,
  NOVICE: secondary.MIDDLE_BLUE,
  INTERMEDIATE: secondary.LIGHT_BLUE,
  EXPERIENCED: secondary.ACCENT_ORANGE
}

export function colorForTag (tag) {
  return TAGS_COLORS[tag]
}
