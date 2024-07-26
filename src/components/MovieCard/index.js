import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {id, title, posterPath, voteAverage} = props

  return (
    <li className="popular-movie-list-item">
      <img
        className="movie-img"
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={id}
      />
      <h1 className="movie-title">{title}</h1>
      <p className="movie-rating">{`Rating: ${voteAverage}`}</p>
      <Link to={`/movies/${id}`}>
        <button type="button" className="view-btn">
          View Details
        </button>
      </Link>
    </li>
  )
}
export default MovieCard
