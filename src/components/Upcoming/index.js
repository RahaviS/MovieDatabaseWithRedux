import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import {getUpcomingMoviesFromApi} from '../../slices/upcomingSlice'
import Navbar from '../Navbar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import './index.css'

const Upcoming = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const {upcomingMovies, isLoading} = useSelector(state => state.upcoming)

  useEffect(() => {
    dispatch(getUpcomingMoviesFromApi(currentPage))
  }, [dispatch, currentPage])

  const renderSpinner = () => (
    <Loader type="TailSpin" color="#2196f3" height={50} width={50} />
  )

  const setPageNo = page => {
    setCurrentPage(page)
  }

  const renderMovies = () => (
    <ul className="upcoming-movie-list">
      {Object.keys(upcomingMovies).length !== 0 &&
        upcomingMovies.results.map(eachMovie => (
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
      <div className="upcoming-container">
        <h1 className="section-title">Upcoming Movies</h1>
        {isLoading ? renderSpinner() : renderMovies()}
        <Pagination
          totalPages={
            Object.keys(upcomingMovies).length !== 0 &&
            upcomingMovies.total_pages
          }
          setPageNo={setPageNo}
          currentPage={currentPage}
        />
      </div>
    </>
  )
}

export default Upcoming
