import React from 'react';
import './PokemonList.scss';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { Pokemon } from '../../types/Pokemon';

interface Props {
  pokemons: Pokemon[];
  setPokeInfo: (pokemon: Pokemon) => void;
  loadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

export const PokemonList: React.FC<Props> = ({ pokemons, setPokeInfo, loadMore, isLoading, hasMore }) => {
  return (
    <div className="pokemons-list">
      <div className="pokemons-list__list">
        {pokemons && pokemons.map((pokemon) => (
          <PokemonCard
            pokemon={pokemon}
            setPokeInfo={setPokeInfo}
            key={pokemon.id} />
        ))}
      </div>
      {hasMore && (
        <button
          className="pokemons-list__button"
          onClick={loadMore}
          disabled={isLoading}
        >
          Load More
        </button>
      )}
    </div>
  );
};
