import React from 'react';
import styles from './Option.module.css';

const Option = ({ pokemon }) => {
  function handleClick(event) {
    const pokemonDiv = event.currentTarget;
    const pokemon = event.currentTarget.id;

    const bros = [...event.currentTarget.parentNode.children];
    const pokemonIndex = bros.indexOf(event.currentTarget);

    bros.splice(pokemonIndex, 1);

    bros.forEach((pokemon) => {
      pokemon.classList.remove('active');
    });

    pokemonDiv.classList.add('active');
    console.log(pokemon);
  }

  return (
    <div className={styles.pokemonCard} id={pokemon.name} onClick={handleClick}>
      <p className={styles.pokemonName}>{pokemon.name}</p>
    </div>
  );
};

export default Option;
