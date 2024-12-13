export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINTS = {
  POKEMON: `${API_BASE_URL}/pokemon/`,
  GENDER: `${API_BASE_URL}/gender/`,
  REGION: `${API_BASE_URL}/region/`,
  HABITAT: `${API_BASE_URL}/pokemon-habitat/`,
};
