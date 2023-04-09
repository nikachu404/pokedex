import React, { useEffect, useState, useRef } from 'react';
import './App.scss';
import { PokemonList } from './components/PokemonList/PokemonList';
import axios from 'axios';
import { Pokemon } from './types/Pokemon';
import { PokemonListResponseData } from './types/PokemonListResponse';
import { PokemonInfo } from './components/PokemonInfo/PokemonInfo';
import { PokemonTypes } from './components/PokemonTypes/PokemonTypes';

export const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokeInfo, setPokeInfo] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=12');
  const [hasMore, setHasMore] = useState(true);
  const dataFetchedRef = useRef(false); // для уникнення side effects(повтор рендеру при першому завантаженні сторінки)

  const [activeTypes, setActiveTypes] = useState<string[]>([]);

  const filteredPokemons = activeTypes.length ? pokemons.filter(pokemon => pokemon.types.some(type => activeTypes.includes(type.type.name))) : pokemons;

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
      <PokemonTypes activeTypes={activeTypes} setActiveTypes={setActiveTypes} />
      <PokemonList
        pokemons={filteredPokemons}
        setPokeInfo={setPokeInfo}
        loadMore={loadMore}
        isLoading={isLoading}
        hasMore={hasMore}
      />
      <PokemonInfo pokeInfo={pokeInfo} />
    </div>
  );
};
