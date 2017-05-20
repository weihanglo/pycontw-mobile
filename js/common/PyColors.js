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
  BACKGROUND: '#132637'
//   '#1697e5',
//   '#5d91c9',
//   '#ff8955',
//   '#00ff96',
//   '#fbda61'
}
export const secondary = {
  BACKGROUND: '#0e4975',
  // '#46c1ea',
  FOREGROUND: '#7fb9cc',
  ACCENT: '#f75b1c',
  ACCENT_GREEN: '#00dfaf'
  // '#e5d983'
}
