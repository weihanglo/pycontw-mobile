export const UPDATE_FILTER = 'UPDATE_FILTER'

export function updateFilter (tags) {
  return {
    type: UPDATE_FILTER,
    tags
  }
}
