import {useSelector} from 'react-redux'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import MovieCard from '../MovieCard'
import './index.css'

const SearchedMovies = () => {
  const {searchedMoviesList, isLoading} = useSelector(
    state => state.searchedMovies,
  )

  const renderSpinner = () => (
    <Loader type="TailSpin" color="#2196f3" height={50} width={50} />
  )

  const renderSearchEmpty = () => (
    <div className="search-empty-page">
      <h1 className="no-results-text">No Results Found!</h1>
      <p className="try-again-text">Please try again.</p>
    </div>
  )

  const renderMovies = () => (
    <ul className="searched-movie-list">
      {Object.keys(searchedMoviesList).length !== 0 &&
      searchedMoviesList.results.length > 0
        ? searchedMoviesList.results.map(eachMovie => (
            <MovieCard
              key={eachMovie.id}
              id={eachMovie.id}
              title={eachMovie.title}
              posterPath={eachMovie.poster_path}
              voteAverage={eachMovie.vote_average}
            />
          ))
        : renderSearchEmpty()}
    </ul>
  )

  return (
    <>
      <Navbar />
      <div className="search-page-container">
        <h1 className="section-title">Searched Movies</h1>
        {isLoading ? renderSpinner() : renderMovies()}
      </div>
    </>
  )
}

export default SearchedMovies
