export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES'

// eventId === event.eventId
export function addToFavorites (eventId) {
  return {
    type: ADD_TO_FAVORITES,
    eventId
  }
}
