import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemonList, fetchPokemonDetail, fetchGenders, fetchRegions, fetchHabitats } from '../api/apiServices';

const initialState = {
  list: [],
  count: 0,
  next: null,
  previous: null,
  status: 'idle',
  error: null,
  selectedPokemon: null,
  genders: [],
  regions: [],
  habitats: [],
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

export const getGenders = createAsyncThunk('pokemon/getGenders', async () => {
  const response = await fetchGenders();
  return response.data.results;
});

export const getRegions = createAsyncThunk('pokemon/getRegions', async () => {
  const response = await fetchRegions();
  return response.data.results;
});

export const getHabitats = createAsyncThunk('pokemon/getHabitats', async () => {
  const response = await fetchHabitats();
  return response.data.results;
});

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
      })
      .addCase(getGenders.fulfilled, (state, action) => {
        state.genders = action.payload;
      })
      .addCase(getRegions.fulfilled, (state, action) => {
        state.regions = action.payload;
      })
      .addCase(getHabitats.fulfilled, (state, action) => {
        state.habitats = action.payload;
      });
  },
});

export default pokemonSlice.reducer;
