import React from 'react';
import './PokemonCard.scss';
import { Pokemon, Type } from '../../types/Pokemon';

interface Props {
  pokemon: Pokemon;
}

const typeColors: Record<string, string> = {
  'normal': '#BCBCAC',
  'fighting': '#BC5442',
  'flying': '#669AFF',
  'poison': '#AB549A',
  'ground': '#DEBC54',
  'rock': '#BCAC66',
  'bug': '#ABBC1C',
  'ghost': '#6666BC',
  'steel': '#ABACBC',
  'fire': '#FF421C',
  'water': '#2F9AFF',
  'grass': '#78CD54',
  'electric': '#FFCD30',
  'psychic': '#FF549A',
  'ice': '#78DEFF',
  'dragon': '#7866EF',
  'dark': '#785442',
  'fairy': '#FFACFF',
  'shadow': '#0E2E4C'
};

export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const typeElements = pokemon.types.map((poke: Type) => (
    <div
      key={poke.type.name}
      className="pokemon-card__type"
      style={{ backgroundColor: typeColors[poke.type.name] }}
    >
      {poke.type.name.charAt(0).toUpperCase() + poke.type.name.slice(1)}
    </div>
  ));


  return (
    <div className="pokemon-card mb-2">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-card__photo"
      />
      <h3 className="pokemon-card__name">
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h3>
      <div className="pokemon-card__types">
        {typeElements}
      </div>
    </div>
  );
};

