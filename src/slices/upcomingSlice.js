import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {upcomingMovies: [], isLoading: false, error: ''}

const apiKey = 'b0df0f206e1d405a64dc38d86300ff8d'
const baseUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`

export const getUpcomingMoviesFromApi = createAsyncThunk(
  'topRatedMovies/getUpcomingMoviesFromApi',
  async (page, {rejectWithValue}) => {
    const response = await fetch(`${baseUrl}&page=${page}`)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      return data
    }
    return rejectWithValue({e: 'No Data Found'})
  },
)

export const upcomingSlice = createSlice({
  name: 'upcomingMovies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUpcomingMoviesFromApi.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = true
      })
      .addCase(getUpcomingMoviesFromApi.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false
        // eslint-disable-next-line no-param-reassign
        state.error = ''
        // eslint-disable-next-line no-param-reassign
        state.upcomingMovies = action.payload
      })
      .addCase(getUpcomingMoviesFromApi.rejected, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false
        // eslint-disable-next-line no-param-reassign
        state.error = action.payload.error
        // eslint-disable-next-line no-param-reassign
        state.topRatedMovies = []
      })
  },
})
export default upcomingSlice.reducer
