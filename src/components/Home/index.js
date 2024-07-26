import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Loader from 'react-loader-spinner'
import {getMoviesFromApi} from '../../slices/movieSlice'
import Navbar from '../Navbar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import './index.css'

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const {popularMovies, isLoading} = useSelector(state => state.movies)

  useEffect(() => {
    dispatch(getMoviesFromApi(currentPage))
  }, [dispatch, currentPage])

  const renderSpinner = () => (
    <Loader type="TailSpin" color="#2196f3" height={50} width={50} />
  )

  const setPageNo = page => {
    setCurrentPage(page)
  }

  const renderMovies = () => (
    <ul className="popular-movie-list">
      {Object.keys(popularMovies).length !== 0 &&
        popularMovies.results.map(eachMovie => (
          <MovieCard
            key={eachMovie.id}
            id={eachMovie.id}
            title={eachMovie.title}
            posterPath={eachMovie.poster_path}
            voteAverage={eachMovie.vote_average}
          />
        ))}
    </ul>
  )

  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1 className="section-title">Popular Movies</h1>
        {isLoading ? renderSpinner() : renderMovies()}
        <Pagination
          totalPages={
            Object.keys(popularMovies).length !== 0 && popularMovies.total_pages
          }
          setPageNo={setPageNo}
          currentPage={currentPage}
        />
      </div>
    </>
  )
}

export default Home
