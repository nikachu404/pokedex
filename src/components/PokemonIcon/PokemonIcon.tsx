import React from 'react';

type Props = {
  path: string;
}

export const PokemonIcon: React.FC<Props> = ({ path }) => {
  return (
    <div className="pokemon-icon">
      <img src={process.env.REACT_APP_ICONS_URL + path + '.svg'} />
    </div>
  );
};
