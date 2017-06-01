import Api from '../api'

export const LOAD_FAVORITES_SUCCESS = 'LOAD_FAVORITES_SUCCESS'
export const LOAD_FAVORITES_FAILURE = 'LOAD_FAVORITES_FAILURE'

function loadFavoritesSuccess (eventIds) {
  return {
    type: LOAD_FAVORITES_SUCCESS,
    eventIds
  }
}

function loadFavoritesFailure (error) {
  return {
    type: LOAD_FAVORITES_FAILURE,
    error
  }
}

export function loadFavorites () {
  return dispatch => (
    Api.loadFavorites()
      .then(eventIds => dispatch(loadFavoritesSuccess(eventIds)))
      .catch(err => dispatch(loadFavoritesFailure(err)))
  )
}
