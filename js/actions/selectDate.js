export const SELECT_DATE = 'FETCH_SCHEDULE'

export function selectDate (date) {
  return {
    type: SELECT_DATE,
    date
  }
}
