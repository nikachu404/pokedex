import React from 'react';
import './PokemonCard.scss';
import { Pokemon, Type } from '../../types/Pokemon';

interface Props {
  pokemon: Pokemon;
  setPokeInfo: (pokemon: Pokemon) => void;
}

const typeColors: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export const PokemonCard: React.FC<Props> = ({ pokemon, setPokeInfo }) => {
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
    <div className="pokemon-card" onClick={() => setPokeInfo(pokemon)}>
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

