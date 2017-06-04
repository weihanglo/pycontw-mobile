import Api from '../api'

export const SYNC_REMOTE_START = 'SYNC_REMOTE_START'
export const SYNC_REMOTE_SUCCESS = 'SYNC_REMOTE_SUCCESS'
export const SYNC_REMOTE_FAILURE = 'SYNC_REMOTE_FAILURE'

export const SYNC_LOCAL_START = 'SYNC_LOCAL_START'
export const SYNC_LOCAL_SUCCESS = 'SYNC_LOCAL_SUCCESS'
export const SYNC_LOCAL_FAILURE = 'SYNC_LOCAL_FAILURE'

export function syncRemote () {
  return dispatch => {
    dispatch({type: SYNC_REMOTE_START})
    return Promise.all([
      Api.syncAllEvents({remote: true}),
      Api.syncAllSchedules({remote: true})
    ])
      .then(() => dispatch({type: SYNC_REMOTE_SUCCESS}))
      .catch(error => dispatch({type: SYNC_REMOTE_FAILURE, error}))
  }
}

export function syncLocal () {
  return dispatch => {
    dispatch({type: SYNC_LOCAL_START})
    return Promise.all([Api.syncAllEvents(), Api.syncAllSchedules()])
      .then(() => dispatch({type: SYNC_LOCAL_SUCCESS}))
      .catch(error => dispatch({type: SYNC_LOCAL_FAILURE, error}))
  }
}
