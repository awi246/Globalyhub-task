import axios from 'axios';
import { ENDPOINTS } from './apiLinks';

export const fetchPokemonList = (offset = 0, limit = 100) => {
  return axios.get(`${ENDPOINTS.POKEMON}?offset=${offset}&limit=${limit}`);
};

export const fetchPokemonDetail = (name) => {
  return axios.get(`${ENDPOINTS.POKEMON}${name}`);
};

export const fetchGenders = () => {
  return axios.get(ENDPOINTS.GENDER);
};

export const fetchGenderDetail = (genderId) => {
  return axios.get(`${ENDPOINTS.GENDER}${genderId}/`);
};

export const fetchRegions = () => {
  return axios.get(ENDPOINTS.REGION);
};

export const fetchRegionDetail = (regionName) => {
  return axios.get(`${ENDPOINTS.REGION}${regionName}/`);
};

export const fetchHabitats = () => {
  return axios.get(ENDPOINTS.HABITAT);
};

export const fetchHabitatDetail = (habitatName) => {
  return axios.get(`${ENDPOINTS.HABITAT}${habitatName}/`);
};

export const fetchPokedex = (pokedexUrl) => {
  return axios.get(pokedexUrl);
};
