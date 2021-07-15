import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Row} from 'react-bootstrap';
import {AppBar} from 'material-ui';
import * as movieActions from './MovieBrowserActions';
import * as movieHelpers from './MovieBrowserHelpers';
import MovieList from './movie-list/MovieListComponent';
class MovieBrowser extends Component {
  state = { 
    currentPage: 1,
      currentMovies: []
   }
  componentDidMount() {
    this.props.getTopMovies(this.state.currentPage);
  }
  handleShowMore=(page)=>{
    const nextPage = this.state.currentPage + 1;
    this.props.getTopMovies(nextPage);
  this.setState({currentPage: nextPage});
  }
  render() { 
    const {topMovies} = this.props;
    const movies = movieHelpers.getMoviesList(topMovies.response);
    console.log(movies)
    return ( 
      <div>
        <AppBar title='Movie Browser' />
        <div className="container">
          <Row>
          <MovieList movies={movies} />
          <div className="row text-center">
            <div className="col text-center">
            <button onClick={()=>this.handleShowMore(this.state.currentPage)} className="btn btn-primary btl-lg">Show More</button>
            </div>
          </div>
            
          </Row>
        </div>
      </div>
     );
  }
}
 
export default connect(
  (state) => ({
    topMovies: state.movieBrowser.topMovies
  }),
  { ...movieActions }
)(MovieBrowser);
