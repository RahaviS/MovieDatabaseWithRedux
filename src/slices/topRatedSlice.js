import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {topRatedMovies: [], isLoading: false, error: ''}

const apiKey = 'b0df0f206e1d405a64dc38d86300ff8d'
const baseUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`

export const getTopRatedMoviesFromApi = createAsyncThunk(
  'topRatedMovies/getTopRatedMoviesFromApi',
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

export const topRatedSlice = createSlice({
  name: 'topRatedMovies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTopRatedMoviesFromApi.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = true
      })
      .addCase(getTopRatedMoviesFromApi.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false
        // eslint-disable-next-line no-param-reassign
        state.error = ''
        // eslint-disable-next-line no-param-reassign
        state.topRatedMovies = action.payload
      })
      .addCase(getTopRatedMoviesFromApi.rejected, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false
        // eslint-disable-next-line no-param-reassign
        state.error = action.payload.error
        // eslint-disable-next-line no-param-reassign
        state.topRatedMovies = []
      })
  },
})
export default topRatedSlice.reducer
