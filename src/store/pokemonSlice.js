import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemonList, fetchPokemonDetail } from '../api/apiServices';

const initialState = {
  list: [],
  count: 0,
  next: null,
  previous: null,
  status: 'idle',
  error: null,
  selectedPokemon: null,
};

export const getPokemonList = createAsyncThunk(
  'pokemon/getList',
  async ({ offset, limit }) => {
    const response = await fetchPokemonList(offset, limit);
    return response.data;
  }
);

export const getPokemonDetail = createAsyncThunk(
  'pokemon/getDetail',
  async (name) => {
    const response = await fetchPokemonDetail(name);
    return response.data;
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPokemonList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPokemonList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.results;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(getPokemonList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getPokemonDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPokemonDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedPokemon = action.payload;
      })
      .addCase(getPokemonDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default pokemonSlice.reducer;
