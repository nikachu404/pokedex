import React, { useState } from 'react';
import {PokemonIcon} from '../PokemonIcon/PokemonIcon';
import classNames from 'classnames';

import './PokemonTypes.scss';

const icons = [
  { type: 'bug', path: 'bug' },
  { type: 'dark', path: 'dark' },
  { type: 'dragon', path: 'dragon' },
  { type: 'electric', path: 'electric' },
  { type: 'fairy', path: 'fairy' },
  { type: 'fighting', path: 'fighting' },
  { type: 'fire', path: 'fire' },
  { type: 'flying', path: 'flying' },
  { type: 'ghost', path: 'ghost' },
  { type: 'grass', path: 'grass' },
  { type: 'ground', path: 'ground' },
  { type: 'ice', path: 'ice' },
  { type: 'normal', path: 'normal' },
  { type: 'poison', path: 'poison' },
  { type: 'psychic', path: 'psychic' },
  { type: 'rock', path: 'rock' },
  { type: 'steel', path: 'steel' },
  { type: 'water', path: 'water' },
];

type Props = {
  activeTypes: string[];
  setActiveTypes: (types: string[]) => void;
}

export const PokemonTypes: React.FC<Props> = ({ activeTypes, setActiveTypes }) => {
  const [isColumnVisible, setIsColumnVisible] = useState(true);

  const toggleColumn = () => {
    setIsColumnVisible((prevState) => !prevState);
  };

  const createIcon = (type: string, image: string, activeTypes: string[], setActiveTypes: (types: string[]) => void) => {
    const isActive = activeTypes.includes(type);

    return (
      <div
        className={classNames(
          `pokemon-types__icon pokemon-types__icon--${type}`,
          type,
          { 'pokemon-types__icon--active': isActive }
        )}
        onClick={() => {
          if (isActive) {
            setActiveTypes(activeTypes.filter(t => t !== type));
          } else {
            setActiveTypes([...activeTypes, type]);
          }
        }}
      >
        <PokemonIcon path={image} />
      </div>
    );
  };

  return (
    <>
      <div className="pokemon-types">
        <button
          className="pokemon-types__burger"
          onClick={toggleColumn}
        >
          Types
        </button>

        <div className={classNames('pokemon-types__row', { visible: !isColumnVisible })}>
          <div className="pokemon-types__column">
            {icons.slice(0,9).map(icon => createIcon(icon.type, icon.path, activeTypes, setActiveTypes))}
          </div>

          <div className="pokemon-types__column">
            {icons.slice(9).map(icon => createIcon(icon.type, icon.path, activeTypes, setActiveTypes))}
          </div>
        </div>
      </div>
    </>
  );
};
