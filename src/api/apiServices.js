import axios from 'axios';
import { ENDPOINTS } from './apiLinks';

const api = axios.create({
  baseURL: ENDPOINTS.POKEMON,
});

export const fetchPokemonList = (offset = 0, limit = 100) => {
  return api.get(`?offset=${offset}&limit=${limit}`);
};

export const fetchPokemonDetail = (name) => {
  return api.get(`${name}`);
};
