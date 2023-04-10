import axios from 'axios';

import { PokemonListResponse } from '../types/PokemonListResponse';
import { Pokemon } from '../types/Pokemon';

export const getPokemonList = async (url: string): Promise<PokemonListResponse> => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    const err = error as Error;
    console.error(`Error fetching pokemon list: ${err.message}`);
    throw error;
  }
};

export const getPokemon = async (url: string): Promise<Pokemon> => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    const err = error as Error;
    console.error(`Error fetching pokemon: ${err.message}`);
    throw error;
  }
};
