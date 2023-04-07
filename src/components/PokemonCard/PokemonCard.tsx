/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './PokemonCard.scss';

interface Props {
  pokemon: any;
}

export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className="pokemon-card mb-2">
      <img
        src={pokemon.sprites.front_default}
        alt=""
        className="pokemon-card__photo" />
      <div className="pokemon-card__name">{pokemon.name}</div>
      <div className="pokemon-card__type">{pokemon.types.map((poke: any) => poke.type.name)}
      </div>
    </div>
  );
};
