import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {BsSearch} from 'react-icons/bs'
import {searchMoviesFromApi} from '../../slices/searchSlice'
import './index.css'

const Navbar = props => {
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useDispatch()

  const onClickSearchButton = () => {
    dispatch(searchMoviesFromApi(searchInput))
    const {history} = props
    history.replace('/searched-movies')
  }
  const {searchedMoviesList} = useSelector(state => state.searchedMovies)

  return (
    <nav className="nav-container">
      <Link to="/" className="nav-link">
        <h1 className="title">movieDB</h1>
      </Link>
      <div className="nav-contents">
        <ul className="nav-menu-list">
          <Link to="/" className="nav-link">
            <li className="nav-item">Popular</li>
          </Link>
          <Link to="/top-rated" className="nav-link">
            <li className="nav-item">Top Rated</li>
          </Link>
          <Link to="/upcoming" className="nav-link">
            <li className="nav-item">Upcoming</li>
          </Link>
          {Object.keys(searchedMoviesList).length !== 0 && (
            <Link to="/searched-movies" className="nav-link">
              <li className="nav-item">Searched Movies</li>
            </Link>
          )}
        </ul>
        <div className="search-section">
          <input
            type="search"
            placeholder="Search Movies"
            className="input-box"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <button
            type="button"
            className="search-btn"
            onClick={onClickSearchButton}
          >
            <BsSearch color="#ffffff" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
