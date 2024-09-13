import React from 'react';
import styles from './PokemonItem.module.css';
import { NavLink } from 'react-router-dom';

const PokemonItem = ({ pokemon }) => {
  return (
    <NavLink to={`/pokemon/${pokemon.name}`}>
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
