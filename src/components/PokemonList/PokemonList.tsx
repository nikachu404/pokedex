/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './PokemonList.scss';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { Pokemon } from '../../types/Pokemon';

interface Props {
  pokemons: Pokemon[];
}

export const PokemonList: React.FC<Props> = ({ pokemons }) => {
  return (
    <div>
      <div className="pokemons-list">
        {pokemons && pokemons.map((pokemon, index) => (
          <PokemonCard pokemon={pokemon} key={index} />
        ))}
      </div>
    </div>

  );
};
