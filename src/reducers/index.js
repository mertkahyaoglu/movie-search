import { combineReducers } from 'redux';
import filters from 'reducers/filters';
import search from 'reducers/search';

export default combineReducers({
  filters: filters,
  search: search
});
