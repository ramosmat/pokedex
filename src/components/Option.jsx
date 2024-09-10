import React from 'react';
import styles from './Option.module.css';

const Option = ({ pokemon }) => {
  function handleClick(event) {
    const pokemon = event.currentTarget.id;
    console.log(pokemon);
  }

  return (
    <div className={styles.pokemonCard} id={pokemon.name} onClick={handleClick}>
      <p className={styles.pokemonName}>{pokemon.name}</p>
    </div>
  );
};

export default Option;
