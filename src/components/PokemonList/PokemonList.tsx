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
      {pokemons.length
        ? (
          <div className="pokemons-list__list">
            {pokemons && pokemons.map((pokemon) => (
              <PokemonCard
                pokemon={pokemon}
                setPokeInfo={setPokeInfo}
                key={pokemon.id} />
            ))}
          </div>
        ) : (
          <h2>There are no pokemon of the selected type among the visible Pokemon, please try to load more</h2>
        )}
      {hasMore && (
        <button
          className="pokemons-list__button"
          onClick={loadMore}
          disabled={isLoading}
        >
          {isLoading ? 'Loading..' : 'Load more'}
        </button>
      )}
    </div>
  );
};
