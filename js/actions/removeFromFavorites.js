export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES'

// eventId === event.eventId
export function removeFromFavorites (eventId) {
  return {
    type: REMOVE_FROM_FAVORITES,
    eventId
  }
}
