/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './PokemonList.scss';
import { PokemonCard } from '../PokemonCard/PokemonCard';

interface Props {
  pokemons: any[];
}

export const PokemonList: React.FC<Props> = ({ pokemons }) => {
  return (
    <div className="pokemons-list">
      {pokemons && pokemons.map(pokemon => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} />
      ))}
    </div>
  );
};
