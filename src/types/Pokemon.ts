export interface Pokemon {
  id: number;
  moves: Move[];
  name: string;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface Move {
  move: Species;
}

export interface GenerationV {
  'black-white': Sprites;
}

export interface Versions {
  'generation-v': GenerationV;
}

export interface Sprites {
  front_default: string;
  versions?: Versions;
  animated: {
    front_default: string;
  };
}
export interface Stat {
  base_stat: number;
  stat: Species;
}

export interface Type {
  type: Species;
}
