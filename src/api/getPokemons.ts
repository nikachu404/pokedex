import axios from 'axios';
import { PokemonListResponse } from '../types/PokemonListResponse';
import { Pokemon } from '../types/Pokemon';

export const getPokemonList = async (url: string): Promise<PokemonListResponse> => {
  const res = await axios.get(url);
  return res.data;
};

export const getPokemon = async (url: string): Promise<Pokemon> => {
  const res = await axios.get(url);
  return res.data;
};