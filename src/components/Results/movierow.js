import React from 'react';
import _ from 'underscore';

let highlight = (text, hl) => {
  let regex = new RegExp( '(' + hl + ')', 'gi' );
  return text.replace( regex, "<em>$1</em>" );
}

var MovieRow = ({movie, current}) => {
  let plot = movie.plot.replace(/(\r\n|\n|\r)/gm,"");
  let cast = movie.cast.join(', ')
  if (current) {
    plot = highlight(plot, current)
    cast = highlight(cast, current)
  }

  return (
    <tr className="movierow">
      <td><img className="thumbnail" src={movie.poster} /></td>
      <td>
        <div className="row-title">
          {movie.title}
          <div className="snippet">
            <img className="img-responsive" src={movie.poster} />
            <div>
              <h3>{movie.title} ({movie.year})</h3>
              <p dangerouslySetInnerHTML={{__html: plot}} />
              <p><span className="hl">Director: </span>{movie.director[0]}</p>
              <p dangerouslySetInnerHTML={{__html: '<span class="hl">Cast: </span>' + cast}} />
            </div>
          </div>
        </div>
      </td>
      <td>{movie.year}</td>
      <td>{movie.genres.join(', ')}</td>
    </tr>
  )
};

export default MovieRow
