import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'

class Genre extends Component {

  onGenreClick(genre) {
    const {onClick} = this.props
    $( findDOMNode(this.refs.genre) ).toggleClass('active')
    onClick(genre)
  }

  render() {
    const {genre, count} = this.props
    return <li ref="genre" onClick={this.onGenreClick.bind(this, genre)}>{genre} <i>({count})</i></li>
  }

}

export default Genre
