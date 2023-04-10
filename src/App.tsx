import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
}
  from 'react';

import { PokemonList } from './components/PokemonList/PokemonList';
import { Pokemon } from './types/Pokemon';
import { PokemonListResponseData } from './types/PokemonListResponse';
import { PokemonInfo } from './components/PokemonInfo/PokemonInfo';
import { PokemonTypes } from './components/PokemonTypes/PokemonTypes';
import { getPokemon, getPokemonList } from './api/getPokemons';

import './App.scss';

export const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokeInfo, setPokeInfo] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState(`${process.env.REACT_APP_API_URL}/pokemon/?limit=12`);
  const [hasMore, setHasMore] = useState(true);
  const dataFetchedRef = useRef(false); // to avoid side effects (repeat rendering when the page is first loaded)

  const [activeTypes, setActiveTypes] = useState<string[]>([]);

  const filteredPokemons = useMemo(() => {
    if (activeTypes.length) {
      return pokemons.filter(pokemon => pokemon.types.some(type => activeTypes.includes(type.type.name)));
    } else {
      return pokemons;
    }
  }, [pokemons, activeTypes]);

  const loadMore = useCallback(async () => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  }, [url]);

  useEffect(() => {
    if (dataFetchedRef.current) {
      return;
    }
    dataFetchedRef.current = true;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getPokemonList(url);
        setUrl(res.next);
        const newPokemons = await Promise.all(
          res.results.map(async (item: PokemonListResponseData) => {
            const result = await getPokemon(item.url);
            return result;
          })
        );
        setPokemons(newPokemons);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
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
