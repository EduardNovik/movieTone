import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type MoviesInfoDataType = {
  [key: string]: any;
};

type MoviesInfoType = {
  data: MoviesInfoDataType[] | [];
  loading: boolean;
};

const initialState: MoviesInfoType = {
  data: [],
  loading: true,
};

export const fetchMoviesAsync = createAsyncThunk(
  'movies/fetchMovies',
  async (url: string, { rejectWithValue }): Promise<MoviesInfoType[]> => {
    const options = {
      method: 'GET',
      url: url,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
      },
    };
    try {
      const response = await axios(options);
      console.log(response);

      return response.data.results;
    } catch (error: any) {
      const errorMessage: string =
        error.response.data.message || 'Unknown error';
      rejectWithValue(errorMessage);
      return [];
    }
  },
);

export const moviesSlice = createSlice({
  name: 'homeContent',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchMoviesAsync.fulfilled,
      (state, action: PayloadAction<MoviesInfoType[]>) => {
        state.loading = false;
        state.data = action.payload;
      },
    );
    builder.addCase(
      fetchMoviesAsync.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = true;
        console.log(state, action.payload);
      },
    );
    builder.addCase(fetchMoviesAsync.pending, state => {
      state.loading = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = moviesSlice.actions;

export default moviesSlice.reducer;

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

// export interface homeContentState {
//   value: number;
// }

// const initialState: homeContentState = {
//   value: 0,
// };

// export const homeContentSlice = createSlice({
//   name: 'homeContent',
//   initialState,
//   reducers: {
//     increment: state => {
//       state.value += 1;
//     },
//     decrement: state => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action: PayloadAction<number>) => {
//       state.value += action.payload;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } =
//   homeContentSlice.actions;

// export default homeContentSlice.reducer;
