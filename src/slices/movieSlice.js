import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {popularMovies: [], isLoading: false, error: ''}

const apiKey = 'b0df0f206e1d405a64dc38d86300ff8d'
const baseUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`

export const getMoviesFromApi = createAsyncThunk(
  'movies/getMoviesFromApi',
  async (page, {rejectWithValue}) => {
    const response = await fetch(`${baseUrl}&page=${page}`)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      return data
    }
    return rejectWithValue({e: 'No Data Found'})
  },
)

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMoviesFromApi.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = true
      })
      .addCase(getMoviesFromApi.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false
        // eslint-disable-next-line no-param-reassign
        state.error = ''
        // eslint-disable-next-line no-param-reassign
        state.popularMovies = action.payload
      })
      .addCase(getMoviesFromApi.rejected, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false
        // eslint-disable-next-line no-param-reassign
        state.error = action.payload.error
        // eslint-disable-next-line no-param-reassign
        state.popularMovies = []
      })
  },
})
export default movieSlice.reducer
