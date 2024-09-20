import React from 'react';
import styles from './PokemonItem.module.css';
import { NavLink } from 'react-router-dom';

const PokemonItem = ({ pokemon, setPokemonName }) => {
  function handleClick() {
    setPokemonName(pokemon.name);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  if (pokemon)
    return (
      <li>
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
      </li>
    );
};

export default PokemonItem;
