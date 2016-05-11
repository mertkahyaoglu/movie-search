import {
  RECEIVE_GENRES,
  UPDATE_ACTIVE_GENRES,
} from '../actions/filters'

export default function filters(state = {
  genres: [],
  actives: [],
}, action) {
  switch (action.type) {
    case RECEIVE_GENRES:
      return Object.assign({}, state, {
        genres: action.genres,
      })
    case UPDATE_ACTIVE_GENRES:
      return Object.assign({}, state, {
        actives: action.genres,
      })
    default:
      return state
  }
}
