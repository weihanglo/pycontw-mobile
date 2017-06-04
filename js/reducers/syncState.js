import {
  SYNC_REMOTE_START,
  SYNC_REMOTE_SUCCESS,
  SYNC_REMOTE_FAILURE,
  SYNC_LOCAL_START,
  SYNC_LOCAL_SUCCESS,
  SYNC_LOCAL_FAILURE
} from '../actions/syncData'

export default function (state = {}, action) {
  switch (action.type) {
    case SYNC_REMOTE_START:
    case SYNC_LOCAL_START:
      return {
        isSyncing: true
      }
    case SYNC_REMOTE_SUCCESS:
    case SYNC_LOCAL_SUCCESS:
      return {isSyncing: false}
    case SYNC_REMOTE_FAILURE:
      return {
        isSyncing: false,
        error: action.error,
        domain: 'REMOTE'
      }
    case SYNC_LOCAL_FAILURE:
      return {
        isSyncing: false,
        error: action.error,
        domain: 'LOCAL'
      }
    default:
      return state
  }
}
