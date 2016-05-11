import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

//Components
import Header from 'components/Header';
import Filters from 'components/Filters';
import SearchForm from 'components/SearchForm';
import Results from 'components/Results';

//Actions
import { fetchGenres, activateGenre } from '../actions/filters'
import { searchMovie, searchByGenres, cleanCurrent } from '../actions/search'

//Styles
import styles from '../constants/main';

class AppContainer extends Component {

  static mapStateToProps(state) {
    const { filters, search } = state;
    return {
      genres: filters.genres,
      results: search.results,
      current: search.current,
    };
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators({
      fetchGenres,
      searchMovie,
      searchByGenres,
      activateGenre,
      cleanCurrent,
    }, dispatch);
  }

  render() {
    const {fetchGenres, current, cleanCurrent, searchMovie, searchByGenres, activateGenre, genres, results} = this.props;
    return (
      <div className="container">
        <Header />
        <Filters fetchGenres={fetchGenres} activateGenre={activateGenre} genres={genres} />
        <SearchForm current={current} cleanCurrent={cleanCurrent} searchMovie={searchMovie} />
        {
          (results.total > 0) && <Results current={current} searchMovie={searchMovie} searchByGenres={searchByGenres} results={results} />
        }
        {
          (results.total < 1) && <div className="error">No results found</div>
        }
      </div>
    );
  }
}

export default connect(AppContainer.mapStateToProps, AppContainer.mapDispatchToProps)(AppContainer);
