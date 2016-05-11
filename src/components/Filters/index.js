import React, { Component } from 'react';
import _ from 'underscore';

import Genre from './genre';

import styles from './style';

class Filters extends Component {

  componentDidMount() {
    const { fetchGenres } = this.props;
    fetchGenres()
  }

  render() {
    const { genres, activateGenre } = this.props;
    let genreList = _.map(genres, (count, genre) => {
      return <Genre key={genre} onClick={activateGenre} genre={genre} count={count} />
    })
    return (
      <div className="filters">
        <ul className="genres">
          {genreList}
        </ul>
      </div>
    );
  }
}

export default Filters
