import React from 'react';
import './PokemonInfo.scss';
import { Pokemon, Type } from '../../types/Pokemon';

interface Props {
  pokeInfo: Pokemon | null;
}

export const PokemonInfo: React.FC<Props> = ({ pokeInfo }) => {
  const typeElements = pokeInfo && pokeInfo.types.map((poke: Type, index: number) => (
    (index === 0
      ? poke.type.name.charAt(0).toUpperCase() + poke.type.name.slice(1)
      : poke.type.name.toLowerCase())
  )).join(', ');

  const attack = pokeInfo && pokeInfo.stats.find(stat => stat.stat.name === 'attack');
  const defense = pokeInfo && pokeInfo.stats.find(stat => stat.stat.name === 'defense');
  const hp = pokeInfo && pokeInfo.stats.find(stat => stat.stat.name === 'hp');
  const specialAttack = pokeInfo && pokeInfo.stats.find(stat => stat.stat.name === 'special-attack');
  const specialDefense = pokeInfo && pokeInfo.stats.find(stat => stat.stat.name === 'special-defense');
  const speed = pokeInfo && pokeInfo.stats.find(stat => stat.stat.name === 'speed');

  const stats = [
    attack,
    defense,
    hp,
    specialAttack,
    specialDefense,
    speed,
  ];

  const statElements = stats.map((stat) => (
    <tr
      className="pokemon-info__stat"
      key={stat?.stat.name}
    >
      <td className="pokemon-info__stat--name">{stat?.stat.name}</td>
      <td>{stat?.base_stat}</td>
    </tr>
  ));

  return (
    <>
      {pokeInfo && (
        <div className="pokemon-info">
          <img
            src={pokeInfo.sprites.versions?.['generation-v']['black-white'].animated.front_default}
            alt={pokeInfo.name}
            className="pokemon-info__photo"
          />

          <div className="pokemon-info__details">
            <h1 className="pokemon-info__name">
              {pokeInfo.name.charAt(0).toUpperCase() + pokeInfo.name.slice(1) + ` #${pokeInfo.id}`}
            </h1>

            <table className="pokemon-info__stats">
              <tbody>
                <tr className="pokemon-info__stat">
                  <td className="pokemon-info__stat--name">Types</td>
                  <td>{typeElements}</td>
                </tr>
                {statElements}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
