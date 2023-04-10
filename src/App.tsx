import React, { useEffect, useState, useRef } from 'react';
import './App.scss';
import { PokemonList } from './components/PokemonList/PokemonList';
import { Pokemon } from './types/Pokemon';
import { PokemonListResponseData } from './types/PokemonListResponse';
import { PokemonInfo } from './components/PokemonInfo/PokemonInfo';
import { PokemonTypes } from './components/PokemonTypes/PokemonTypes';
import { getPokemon, getPokemonList } from './api/getPokemons';

export const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokeInfo, setPokeInfo] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=12');
  const [hasMore, setHasMore] = useState(true);
  const dataFetchedRef = useRef(false); // to avoid side effects (repeat rendering when the page is first loaded)

  const [activeTypes, setActiveTypes] = useState<string[]>([]);

  const filteredPokemons = activeTypes.length ? pokemons.filter(pokemon => pokemon.types.some(type => activeTypes.includes(type.type.name))) : pokemons;

  const loadMore = async () => {
    if (url) {
      setIsLoading(true);
      const res = await getPokemonList(url);
      setUrl(res.next);
      const newPokemons = await Promise.all(res.results.map(async (item) => {
        const result = await getPokemon(item.url);
        return result;
      }));
      setPokemons(prev => [...prev, ...newPokemons]);
      setIsLoading(false);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) {
      return;
    }
    dataFetchedRef.current = true;
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getPokemonList(url);
      setUrl(res.next);
      const newPokemons = await Promise.all(res.results.map(async (item: PokemonListResponseData) => {
        const result = await getPokemon(item.url);
        return result;
      }));
      setPokemons(newPokemons);
      setIsLoading(false);
    };
    fetchData();
  }, []);


  return (
    <div className="App">
      <div className="App__title-container">
        <h1 className="App__title">Pokedex</h1>
      </div>

      <div className="App__container">
        <PokemonTypes activeTypes={activeTypes} setActiveTypes={setActiveTypes} />
        <PokemonList
          pokemons={filteredPokemons}
          setPokeInfo={setPokeInfo}
          loadMore={loadMore}
          isLoading={isLoading}
          hasMore={hasMore}
        />
        <PokemonInfo
          pokeInfo={pokeInfo}
          setPokeInfo={setPokeInfo}
        />
      </div>
    </div>
  );
};
