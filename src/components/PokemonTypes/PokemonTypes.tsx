import React, { useState } from 'react';
import './PokemonTypes.scss';
import classNames from 'classnames';

import bug from '../../assets/icons/bug.svg';
import dark from '../../assets/icons/dark.svg';
import dragon from '../../assets/icons/dragon.svg';
import electric from '../../assets/icons/electric.svg';
import fairy from '../../assets/icons/fairy.svg';
import fighting from '../../assets/icons/fighting.svg';
import fire from '../../assets/icons/fire.svg';
import flying from '../../assets/icons/flying.svg';
import ghost from '../../assets/icons/ghost.svg';
import grass from '../../assets/icons/grass.svg';
import ground from '../../assets/icons/ground.svg';
import ice from '../../assets/icons/ice.svg';
import normal from '../../assets/icons/normal.svg';
import poison from '../../assets/icons/poison.svg';
import psychic from '../../assets/icons/psychic.svg';
import rock from '../../assets/icons/rock.svg';
import steel from '../../assets/icons/steel.svg';
import water from '../../assets/icons/water.svg';

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
        <img src={image} alt={type} />
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
            {createIcon('bug', bug, activeTypes, setActiveTypes)}
            {createIcon('dark', dark, activeTypes, setActiveTypes)}
            {createIcon('dragon', dragon, activeTypes, setActiveTypes)}
            {createIcon('electric', electric, activeTypes, setActiveTypes)}
            {createIcon('fairy', fairy, activeTypes, setActiveTypes)}
            {createIcon('fighting', fighting, activeTypes, setActiveTypes)}
            {createIcon('fire', fire, activeTypes, setActiveTypes)}
            {createIcon('flying', flying, activeTypes, setActiveTypes)}
            {createIcon('ghost', ghost, activeTypes, setActiveTypes)}
          </div>

          <div className="pokemon-types__column">
            {createIcon('grass', grass, activeTypes, setActiveTypes)}
            {createIcon('ground', ground, activeTypes, setActiveTypes)}
            {createIcon('ice', ice, activeTypes, setActiveTypes)}
            {createIcon('normal', normal, activeTypes, setActiveTypes)}
            {createIcon('poison', poison, activeTypes, setActiveTypes)}
            {createIcon('psychic', psychic, activeTypes, setActiveTypes)}
            {createIcon('rock', rock, activeTypes, setActiveTypes)}
            {createIcon('steel', steel, activeTypes, setActiveTypes)}
            {createIcon('water', water, activeTypes, setActiveTypes)}
          </div>
        </div>
      </div>
    </>
  );
};
