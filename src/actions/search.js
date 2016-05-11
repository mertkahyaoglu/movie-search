import _ from 'underscore';
import { PER_PAGE } from '../constants/constants';

export const RECEIVE_RESULTS = 'RECEIVE_RESULTS'
export const CLEAN_CURRENT = 'CLEAN_CURRENT'

export function searchMovie(input, page) {
  return (dispatch, getState) => {
    let start = (page - 1) * PER_PAGE;
    let rows = PER_PAGE;

    let genres = getState().filters.actives

    let joinFQs = ""
    if (genres) {
      let formattedFQs = _.map(genres, (genre) => {
        return `fq=genres%3A"${genre}"`
      })
      joinFQs = formattedFQs.join('&')
    }

    const search_url = `http://localhost:8983/solr/movies/select?q=${input}&${joinFQs}&start=${start}&rows=${rows}&wt=json&json.wrf=callback`
    $.ajax({
      url: search_url, crossDomain: true, dataType:'jsonp', jsonpCallback: 'callback'
    }).done(function(data) {

      let results = {
        current: { type: 'normal', query: input },
        movies: data.response.docs,
        total: data.response.numFound,
        time: data.responseHeader.QTime,
        numOfPages: Math.ceil(data.response.numFound / PER_PAGE)
      }

      dispatch(receiveResults(results))
    });
  }
}

export function searchByGenres(genres, page) {
  return (dispatch, getState) => {
    let start = (page - 1) * PER_PAGE;
    let rows = PER_PAGE;
    let formattedFQs = _.map(genres, (genre) => {
      return `fq=genres%3A"${genre}"`
    })
    let joinFQs = formattedFQs.join('&')

    let q = getState().search.current ? getState().search.current : "*%3A*"

    const search_url = `http://localhost:8983/solr/movies/select?q=${q}&${joinFQs}&start=${start}&rows=${rows}&wt=json&json.wrf=callback`
    console.log("Search url:",search_url)
    $.ajax({
      url: search_url, crossDomain: true, dataType:'jsonp', jsonpCallback: 'callback'
    }).done(function(data) {

      let results = {
        current: { type: 'genre', query: genres },
        movies: data.response.docs,
        total: data.response.numFound,
        time: data.responseHeader.QTime,
        numOfPages: Math.ceil(data.response.numFound / PER_PAGE)
      }

      dispatch(receiveResults(results))
    });
  }
}

function receiveResults(results) {
  return {
    type: RECEIVE_RESULTS,
    results
  }
}

export function cleanCurrent() {
  return {
    type: CLEAN_CURRENT
  }
}
