import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'

import styles from './style';

class SearchForm extends Component {

  handleChange(e) {
    const { searchMovie } = this.props
    if(e.which == 13) {
      let input = e.target.value
      searchMovie(input, 1)
    }
  }

  handleCleanClick() {
    const { cleanCurrent } = this.props
    findDOMNode(this.refs.search).value = ''
    cleanCurrent()
  }

  render() {
    const { current } = this.props
    return (
      <div className="search-form">
        <input onKeyPress={this.handleChange.bind(this)} type="text" ref="search" placeholder="Search a movie" />
        {
          current && <span onClick={this.handleCleanClick.bind(this)} className="btn-clean">X</span>
        }
      </div>
    );
  }

}

export default SearchForm
