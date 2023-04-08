/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { PokemonList } from './components/PokemonList/PokemonList';
import axios from 'axios';
import { Pokemon } from './types/Pokemon';
import { PokemonListResponseData } from './types/PokemonListResponse';
import { PokemonInfo } from './components/PokemonInfo/PokemonInfo';

export const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokeInfo, setPokeInfo] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=12');
  const [hasMore, setHasMore] = useState(true);
  const dataFetchedRef = useRef(false); // для уникнення side effects(повтор рендеру при першому завантаженні сторінки)

  const loadMore = async () => {
    if (url) {
      setIsLoading(true);
      const res = await axios.get(url);
      setUrl(res.data.next);
      getPokemon(res.data.results);
      setIsLoading(false);
    } else {
      setHasMore(false);
    }
  };

  const getPokemonList = async () => {
    setIsLoading(true);
    const res = await axios.get(url);
    setUrl(res.data.next);
    getPokemon(res.data.results);
    setIsLoading(false);
  };

  const getPokemon = async (res: PokemonListResponseData[]) => {
    const newPokemons: Pokemon[] = [];
    for (const item of res) {
      const result = await axios.get(item.url);
      newPokemons.push(result.data);
      console.log(result.data);
    }
    setPokemons(prev => [...prev, ...newPokemons]);
  };

  useEffect(() => {
    if (dataFetchedRef.current) {
      return;
    }
    dataFetchedRef.current = true;
    getPokemonList();
  }, []);

  return (
    <div className="App">
      <div className="list-wrapper">
        <PokemonList pokemons={pokemons} setPokeInfo={setPokeInfo}/>
        {hasMore && (
          <button
            className="load-more__button"
            onClick={loadMore}
            disabled={isLoading}
          >
            Load More
          </button>
        )}
      </div>
      <PokemonInfo pokeInfo={pokeInfo} />
    </div>
  );
};
