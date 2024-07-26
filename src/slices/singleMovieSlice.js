import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  movieDetails: [],
  castDetails: [],
  isLoading: false,
  error: '',
}

const apiKey = 'b0df0f206e1d405a64dc38d86300ff8d'

export const getMovieDetailsFromApi = createAsyncThunk(
  'movies/getMovieDetailsFromApi',
  async (id, {rejectWithValue}) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
    )
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      return data
    }
    return rejectWithValue({e: 'No Data Found'})
  },
)

export const getCastDetailsFromApi = createAsyncThunk(
  'movies/getCastDetailsFromApi',
  async (id, {rejectWithValue}) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`,
    )
    if (response.ok) {
      const castData = await response.json()
      console.log(castData)
      return castData
    }
    return rejectWithValue({e: 'No Data Found'})
  },
)

export const singleMovieSlice = createSlice({
  name: 'singlemovie',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMovieDetailsFromApi.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = true
      })
      .addCase(getMovieDetailsFromApi.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false
        // eslint-disable-next-line no-param-reassign
        state.error = ''
        // eslint-disable-next-line no-param-reassign
        state.movieDetails = action.payload
      })
      .addCase(getMovieDetailsFromApi.rejected, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false
        // eslint-disable-next-line no-param-reassign
        state.error = action.payload.error
        // eslint-disable-next-line no-param-reassign
        state.movieDetails = []
      })
      .addCase(getCastDetailsFromApi.pending, state => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = true
      })
      .addCase(getCastDetailsFromApi.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false
        // eslint-disable-next-line no-param-reassign
        state.error = ''
        // eslint-disable-next-line no-param-reassign
        state.castDetails = action.payload
      })
      .addCase(getCastDetailsFromApi.rejected, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.isLoading = false
        // eslint-disable-next-line no-param-reassign
        state.error = action.payload.error
        // eslint-disable-next-line no-param-reassign
        state.castDetails = []
      })
  },
})
export default singleMovieSlice.reducer
