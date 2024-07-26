import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {searchedMoviesList: [], isLoading: false}

const apiKey = 'b0df0f206e1d405a64dc38d86300ff8d'
const baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US`

export const searchMoviesFromApi = createAsyncThunk(
  'movies/searchMoviesFromApi',
  async (searchInput, {rejectWithValue}) => {
    const response = await fetch(`${baseUrl}&query=${searchInput}&page=1`)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      return data
    }
    return rejectWithValue({e: 'No Movies Found'})
  },
)
export const searchSlice = createSlice({
  name: 'searchedMovies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchMoviesFromApi.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = true
      })
      .addCase(searchMoviesFromApi.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false
        // eslint-disable-next-line no-param-reassign
        state.searchedMoviesList = action.payload
        // eslint-disable-next-line no-param-reassign
        state.error = ''
      })
      .addCase(searchMoviesFromApi.rejected, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false
        // eslint-disable-next-line no-param-reassign
        state.error = action.payload.error
        // eslint-disable-next-line no-param-reassign
        state.searchedMoviesList = []
      })
  },
})
export default searchSlice.reducer
