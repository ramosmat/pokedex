import React from 'react';
import styles from './Option.module.css';
import { NavLink } from 'react-router-dom';

const Option = ({ pokemon, setpokemonSelected }) => {
  //Get the name of the pokemon used as an id for the div to use as a filter in Status component
  function handleClick(event) {
    const pokemonDiv = event.currentTarget;
    setpokemonSelected(event.currentTarget.id);

    const bros = [...event.currentTarget.parentNode.children];
    const pokemonIndex = bros.indexOf(event.currentTarget);

    bros.splice(pokemonIndex, 1);

    bros.forEach((pokemon) => {
      pokemon.classList.remove('active');
    });

    pokemonDiv.classList.add('active');
  }

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
            <div className={styles.divType}>
              <span key={type.slot}>{type.type.name}</span>
            </div>
          ))}
        </div>
      </div>
    </NavLink>
  );
};

export default Option;
