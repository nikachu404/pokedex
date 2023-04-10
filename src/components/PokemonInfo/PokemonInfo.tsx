import React, { useEffect, useState } from 'react';
import './PokemonInfo.scss';
import { Pokemon, Type } from '../../types/Pokemon';
import classNames from 'classnames';
import closeButton from '../../assets/images/close-icon.png';

interface Props {
  pokeInfo: Pokemon | null;
  setPokeInfo: (pokeInfo: Pokemon | null) => void;
}

export const PokemonInfo: React.FC<Props> = ({ pokeInfo, setPokeInfo }) => {
  const [slideOut, setSlideOut] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(pokeInfo);

  useEffect(() => {
    setSlideOut(true);

    const timerId = setTimeout(() => {
      setPokemon(pokeInfo);
      setSlideOut(false);
    }, 350);

    return () => clearTimeout(timerId);
  }, [pokeInfo]);

  useEffect(() => {
    setSlideOut(false);
  }, []);


  const typeElements = pokemon?.types.map(
    (poke: Type, index: number) => {
      const typeName = index === 0
        ? poke.type.name.charAt(0).toUpperCase() + poke.type.name.slice(1)
        : poke.type.name.toLowerCase();

      return typeName;
    }
  ).join(', ');

  const getStatValue = (statName: string) => {
    const stat = pokemon?.stats.find(stat => stat.stat.name === statName);

    return stat ? stat.base_stat : '';
  };

  const stats = [
    'attack',
    'defense',
    'hp',
    'special-attack',
    'special-defense',
    'speed',
  ];

  const statElements = stats.map(statName => {
    const statValue = getStatValue(statName);

    return statValue
      ? (
        <tr key={statName} className="pokemon-info__stat">
          <td className="pokemon-info__stat--name">
            {statName.charAt(0).toUpperCase() + statName.slice(1)}
          </td>
          <td>{statValue}</td>
        </tr>
      ) : null;
  });

  const handleButtonClick = () => {
    setSlideOut(true);
    setPokeInfo(null);
  };

  return (
    <>
      {pokeInfo && (
        <button
          className="pokemon-info__close-btn"
          onClick={handleButtonClick}
        >
          <img src={closeButton} alt="close button" />
        </button>
      )}

      {pokemon && (
        <div className={classNames(
          'pokemon-info',
          { 'slide-in': !slideOut },
          { 'slide-out': slideOut }
        )}
        >
          <img
            src={pokemon.sprites.versions?.['generation-v']['black-white'].animated.front_default}
            alt={pokemon.name}
            className="pokemon-info__photo"
          />

          <div className="pokemon-info__details">
            <h1 className="pokemon-info__name">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                + ` #${pokemon.id.toString().padStart(3, '0')}`}
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
                  <td>{pokemon.weight}</td>
                </tr>

                <tr>
                  <td>Total moves</td>
                  <td>{pokemon.moves.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
