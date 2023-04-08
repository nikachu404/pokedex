import React from 'react';
import './PokemonList.scss';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { Pokemon } from '../../types/Pokemon';

interface Props {
  pokemons: Pokemon[];
  setPokeInfo: (pokemon: Pokemon) => void;
}

export const PokemonList: React.FC<Props> = ({ pokemons, setPokeInfo }) => {
  return (
    <div>
      <div className="pokemons-list">
        {pokemons && pokemons.map((pokemon) => (
          <PokemonCard
            pokemon={pokemon}
            setPokeInfo={setPokeInfo}
            key={pokemon.id} />
        ))}
      </div>
    </div>

  );
};
