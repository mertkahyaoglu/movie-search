import React, { Component } from 'react';
import _ from 'underscore';

class Pagination extends Component {

  onPageClick(page) {
    const { current, searchMovie, searchByGenres } = this.props
    if (current.type == 'normal') {
      searchMovie(current.query, page)
    } else if (current.type == 'genre') {
      searchByGenres(current.query, page)
    }
  }

  render() {
    const { numOfPages } = this.props
    let pages = []
    _.times(numOfPages, (n) => {
      pages.push(<li key={n} onClick={this.onPageClick.bind(this, n+1)}><a href="#">{n+1}</a></li>)
    })
    return (
      <ul className="pagination">
        {pages}
      </ul>
    );
  }

}

export default Pagination
