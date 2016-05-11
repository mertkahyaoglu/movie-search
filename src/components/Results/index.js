import React, { Component } from 'react';
import _ from 'underscore';

import MovieRow from './movierow';
import Pagination from './pagination';

import styles from './style';

class Results extends Component {

  render() {
    const { results, current, searchMovie, searchByGenres } = this.props
    let movies = _.map(results.movies, (movie) => {
      return <MovieRow key={movie.imdbid} current={current} movie={movie} />
    })
    return (
      <div className="results">
        <div className="stats">Found {results.total} {results.total > 1 ? "results" : "result"} ({results.time} ms)</div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Year</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {movies}
          </tbody>
        </table>

        <Pagination current={results.current} numOfPages={results.numOfPages} searchMovie={searchMovie} searchByGenres={searchByGenres} />

      </div>
    );
  }

}

export default Results
