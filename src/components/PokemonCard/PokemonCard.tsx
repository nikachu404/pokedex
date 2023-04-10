import React from 'react';
import { Pokemon, Type } from '../../types/Pokemon';
import { typeColors } from '../../constansts/typeColors';

import './PokemonCard.scss';

interface Props {
  pokemon: Pokemon;
  setPokeInfo: (pokemon: Pokemon) => void;
}

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

