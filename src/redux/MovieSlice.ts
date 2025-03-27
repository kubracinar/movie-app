import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constants/constants";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  Type: string;
  
}

interface MovieState {
  movies: Movie[];
  status: "idle" | "loading" | "failed";
}

const initialState: MovieState = {
  movies: [],
  status: "idle",
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (query: string) => {
    const response = await axios.get(`${API_URL}&s=${query}`);
    return response.data.Search || [];
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "idle";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default movieSlice.reducer;
