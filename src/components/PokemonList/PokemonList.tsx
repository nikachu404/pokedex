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
        {pokemons && pokemons.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
    </div>

  );
};
