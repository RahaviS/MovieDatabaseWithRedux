import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import {getTopRatedMoviesFromApi} from '../../slices/topRatedSlice'
import Navbar from '../Navbar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import './index.css'

const TopRated = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const {topRatedMovies, isLoading} = useSelector(state => state.topRated)

  useEffect(() => {
    dispatch(getTopRatedMoviesFromApi(currentPage))
  }, [dispatch, currentPage])

  const renderSpinner = () => (
    <Loader type="TailSpin" color="#2196f3" height={50} width={50} />
  )

  const renderMovies = () => (
    <ul className="top-rated-movie-list">
      {Object.keys(topRatedMovies).length !== 0 &&
        topRatedMovies.results.map(eachMovie => (
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
  const setPageNo = page => {
    setCurrentPage(page)
  }
  return (
    <>
      <Navbar />
      <div className="top-rated-container">
        <h1 className="section-title">Top Rated Movies</h1>
        {isLoading ? renderSpinner() : renderMovies()}
        <Pagination
          totalPages={
            Object.keys(topRatedMovies).length !== 0 &&
            topRatedMovies.total_pages
          }
          setPageNo={setPageNo}
          currentPage={currentPage}
        />
      </div>
    </>
  )
}

export default TopRated
