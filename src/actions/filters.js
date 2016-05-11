import _ from 'underscore';

export const RECEIVE_GENRES = 'RECEIVE_GENRES'
export const UPDATE_ACTIVE_GENRES = 'UPDATE_ACTIVE_GENRES'

import { searchByGenres } from './search'

const genres_url = "http://localhost:8983/solr/movies/select?q=*%3A*&wt=json&"+
"json.wrf=callback&facet=true&facet.field=genres"

export function fetchGenres() {
  return (dispatch) => {
    $.ajax({
      url: genres_url, crossDomain: true, dataType:'jsonp', jsonpCallback: 'callback'
    }).done(function(data) {
      let genres = data.facet_counts.facet_fields.genres
      let formattedGenres = {}
      _.each(genres, (element, index, list) => {
        if (index % 2 == 0) formattedGenres[element] = list[index+1]
      })
      dispatch(receiveGenres(formattedGenres))
    });
  }
}

function receiveGenres(genres) {
  return {
    type: RECEIVE_GENRES,
    genres
  }
}

export function activateGenre(genre) {
  return (dispatch, getState) => {
    let actives = getState().filters.actives

    if (_.indexOf(actives, genre) != -1) {
      actives = _.without(actives, genre)
    }else {
      actives.push(genre)
    }
    console.log("CURRENT:",actives)
    dispatch(updateActiveGenres(actives))

    if(actives.length) {
      dispatch(searchByGenres(actives, 1))
    }
  }
}

function updateActiveGenres(genres) {
  return {
    type: UPDATE_ACTIVE_GENRES,
    genres
  }
}
