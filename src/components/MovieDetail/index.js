import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {
  getMovieDetailsFromApi,
  getCastDetailsFromApi,
} from '../../slices/singleMovieSlice'
import Navbar from '../Navbar'
import './index.css'

const MovieDetail = props => {
  const {match} = props
  const {params} = match
  const {id} = params
  const dispatch = useDispatch()
  const {movieDetails, castDetails, isLoading} = useSelector(
    state => state.singleMovie,
  )
  useEffect(() => {
    dispatch(getMovieDetailsFromApi(id))
    dispatch(getCastDetailsFromApi(id))
  }, [dispatch, id])

  const renderSpinner = () => (
    <Loader type="TailSpin" color="#2196f3" height={50} width={50} />
  )

  const renderGenres = () => (
    <div className="genre-section">
      <p className="genre-text">Genres: </p>
      <ul className="genre-list">
        {Object.keys(movieDetails).length !== 0 &&
          movieDetails.genres.map(eachGenre => (
            <li key={eachGenre.id} className="genre-item">
              {eachGenre.name}
            </li>
          ))}
      </ul>
    </div>
  )

  const renderMovieContents = () => (
    <>
      <div className="movie-details-container">
        <h1 className="heading">Movie Details</h1>
        <p className="movie-name">{movieDetails.title}</p>
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
          alt={movieDetails.id}
        />
        <p className="overview">{movieDetails.overview}</p>
        <div className="rating-duration">
          <p className="rating">
            <span>Rating: </span> {movieDetails.vote_average}
          </p>
          <p className="duration">
            <span>Duration: </span>
            {`${movieDetails.runtime} mins`}
          </p>
        </div>
        {renderGenres()}
        <p className="release-date">
          <span>Released on: </span>
          {movieDetails.release_date}
        </p>
      </div>
      <hr />
      <div className="cast-details-container">
        <h1 className="heading">Cast Details</h1>
        <ul className="cast-list">
          {Object.keys(castDetails).length !== 0 &&
            castDetails.cast.map(eachMember => (
              <li key={eachMember.id} className="cast-item">
                <img
                  src={`https://image.tmdb.org/t/p/w500${eachMember.profile_path}`}
                  alt={eachMember.original_name}
                  className="cast_image"
                />
                <p className="original-name">{eachMember.original_name}</p>
                <p className="character-name">
                  <span>Character: </span>
                  {eachMember.character}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </>
  )

  return (
    <>
      <Navbar />
      <div className="movie-contents-cotnainer">
        {isLoading ? renderSpinner() : renderMovieContents()}
      </div>
    </>
  )
}

export default MovieDetail
