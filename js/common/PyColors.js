const LOCATION_COLORS = {
  R0: 'hsl(245, 44%, 48%)',
  R1: 'hsl(284, 89%, 35%)',
  R2: 'hsl(142, 58%, 26%)',
  R4: 'hsl(36, 38%, 56%)',
  ALL: 'hsl(118, 100%, 19%)'
}

export function colorForLocation (loc) {
  return LOCATION_COLORS[loc]
}

export const DARK_TEXT = 'hsl(0, 0%, 24%)'
export const LIGHT_TEXT = 'hsl(0, 0%, 90%)'
export const LIGHT_BACKGROUND = 'hsl(0, 0%, 90%)'

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
