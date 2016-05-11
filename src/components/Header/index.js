import React from 'react';
import { Link } from 'react-router';

import styles from './style';

var Header = (props) => {
  return (
    <div className="header">
      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 titleContainer">
        <Link to="/">Movies</Link>
        <p>Movie search with Solr</p>
      </div>
      <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 banner nopad">
        <img src={require("../../images/movies.jpg")} className="img-responsive" />
      </div>
    </div>
  );
};

export default Header
