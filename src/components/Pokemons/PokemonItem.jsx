import React, { useState } from 'react';
import styles from './PokemonItem.module.css';
import { NavLink } from 'react-router-dom';

const PokemonItem = ({ pokemon, setPokemonName }) => {
  function handleClick() {
    console.log(pokemon.name);

    setPokemonName(pokemon.name);
  }

  if (pokemon)
    return (
      <NavLink to={`/pokemon/${pokemon.name}`} onClick={handleClick}>
        <div className={styles.item}>
          <div className={styles.divImg}>
            <img src={pokemon.img} alt="imagem pokemon" />
          </div>

          <div className={styles.divName}>
            <p>
              nº<span>{pokemon.num}</span>
            </p>
            <span>{pokemon.name}</span>
          </div>

          <div className={styles.divTypes}>
            {pokemon.types.map((type) => (
              <div className={styles.divType} key={type.slot}>
                <span>{type.type.name}</span>
              </div>
            ))}
          </div>
        </div>
      </NavLink>
    );
};

export default PokemonItem;
