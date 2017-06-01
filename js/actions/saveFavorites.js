import Api from '../api'

export const SAVE_FAVORITES_SUCCESS = 'SAVE_FAVORITES_SUCCESS'
export const SAVE_FAVORITES_FAILURE = 'SAVE_FAVORITES_FAILURE'

function saveFavoritesSuccess (eventIds) {
  return {
    type: SAVE_FAVORITES_SUCCESS,
    eventIds
  }
}

function saveFavoritesFailure (error) {
  return {
    type: SAVE_FAVORITES_FAILURE,
    error
  }
}

export function saveFavorites (eventIds) {
  return dispatch => (
    Api.saveFavorites(eventIds)
      .then(() => dispatch(saveFavoritesSuccess(eventIds)))
      .catch(err => dispatch(saveFavoritesFailure(err)))
  )
}
