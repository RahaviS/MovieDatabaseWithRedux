import {configureStore} from '@reduxjs/toolkit'
import movieReducer from '../slices/movieSlice'
import topRatedReducer from '../slices/topRatedSlice'
import upcomingReducer from '../slices/upcomingSlice'
import singleMovieReducer from '../slices/singleMovieSlice'
import searchReducer from '../slices/searchSlice'

const store = configureStore({
  reducer: {
    movies: movieReducer,
    topRated: topRatedReducer,
    upcoming: upcomingReducer,
    singleMovie: singleMovieReducer,
    searchedMovies: searchReducer,
  },
})

export default store
