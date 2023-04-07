import { Pokemon } from './Pokemon';

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonListResponseData {
  name: string;
  url: string;
}