export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string | null;
  results: PokemonListResponseData[];
}

export interface PokemonListResponseData {
  name: string;
  url: string;
}