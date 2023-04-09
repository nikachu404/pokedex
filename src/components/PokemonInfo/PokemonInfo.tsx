import React, { useEffect, useState } from 'react';
import './PokemonInfo.scss';
import { Pokemon, Type } from '../../types/Pokemon';
import classNames from 'classnames';

interface Props {
  pokeInfo: Pokemon | null;
}

export const PokemonInfo: React.FC<Props> = ({ pokeInfo }) => {
  const [slideOut, setSlideOut] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(pokeInfo);

  useEffect(() => {
    setSlideOut(true);

    setTimeout(() => {
      setPokemon(pokeInfo);
      setSlideOut(false);
    }, 350);
  }, [pokeInfo]);

  useEffect(() => {
    setSlideOut(false);
  }, []);


  const typeElements = pokemon && pokemon.types.map((poke: Type, index: number) => (
    (index === 0
      ? poke.type.name.charAt(0).toUpperCase() + poke.type.name.slice(1)
      : poke.type.name.toLowerCase())
  )).join(', ');

  const attack = pokemon && pokemon.stats.find(stat => stat.stat.name === 'attack');
  const defense = pokemon && pokemon.stats.find(stat => stat.stat.name === 'defense');
  const hp = pokemon && pokemon.stats.find(stat => stat.stat.name === 'hp');
  const specialAttack = pokemon && pokemon.stats.find(stat => stat.stat.name === 'special-attack');
  const specialDefense = pokemon && pokemon.stats.find(stat => stat.stat.name === 'special-defense');
  const speed = pokemon && pokemon.stats.find(stat => stat.stat.name === 'speed');
  const weight = pokemon && pokemon.height;
  // const totalMoves = pokemon && pokemon.moves;

  const stats = [
    attack,
    defense,
    hp,
    specialAttack,
    specialDefense,
    speed,
  ];

  const statElements = stats.map((stat) => (
    stat && stat.stat && (
      <tr
        className="pokemon-info__stat"
        key={stat.stat.name}
      >
        <td className="pokemon-info__stat--name">
          {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}
        </td>
        <td>{stat.base_stat}</td>
      </tr>
    )
  ));

  return (
    <>
      <button className="pokemon-info__close-btn" onClick={() => setSlideOut(true)}>
        X
      </button>
      {pokemon && (
        <div className={classNames(
          'pokemon-info',
          { 'slide-in': pokemon && !slideOut },
          { 'slide-out': slideOut }
        )}>
          <img
            src={pokemon.sprites.versions?.['generation-v']['black-white'].animated.front_default}
            alt={pokemon.name}
            className="pokemon-info__photo"
          />

          <div className="pokemon-info__details">
            <h1 className="pokemon-info__name">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + ` #${pokemon.id}`}
            </h1>

            <table className="pokemon-info__stats">
              <tbody>
                <tr className="pokemon-info__stat">
                  <td className="pokemon-info__stat--name">Type</td>
                  <td>{typeElements}</td>
                </tr>
                {statElements}
                <tr className="pokemon-info__stat">
                  <td className="pokemon-info__stat--name">Weight</td>
                  <td>{weight}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
