/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import './App.css';
import { PokemonList } from './components/PokemonList/PokemonList';
import axios from 'axios';

export const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=12');

  const getPokemonList = async () => {
    setIsLoading(true);
    const res = await axios.get(url);
    setUrl(res.data.next);
    getPokemon(res.data.results);
    setIsLoading(false);
  };

  const getPokemon = async (res: any) => {
    res.map(async (item: any) => {
      const result = await axios.get(item.url);
      setPokemons(state => [...state, result.data]);
      console.log(result.data);
    });
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
    </div>
  );
};
