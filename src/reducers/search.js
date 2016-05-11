import {
  RECEIVE_RESULTS,
  CLEAN_CURRENT,
} from '../actions/search'

export default function search(state = {
  results: {},
  current: "",
}, action) {
  switch (action.type) {
    case RECEIVE_RESULTS:
      let results = action.results
      return Object.assign({}, state, {
        results: results,
        current: (results.current.type == 'normal') ? results.current.query : state.current
      })
    case CLEAN_CURRENT:
      return Object.assign({}, state, {
        current: "",
      })
    default:
      return state
  }
}
