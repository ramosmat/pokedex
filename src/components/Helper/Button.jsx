import { useEffect, useState } from 'react';
import styles from './Button.module.css';

const Button = ({ nextPage, setNextPage, getPokemonBrief }) => {
  const [newData, setNewData] = useState();

  async function getMorePokemons() {
    const response = await fetch(nextPage);
    const newPokemons = await response.json();

    console.log('newPokemons:', newPokemons);

    if (response.ok && newPokemons) {
      setNextPage(newPokemons.next);
      setNewData(newPokemons.results);
    }
  }

  //useEffect to use getPokemonBrief to render more pokemons each time newData get uploaded
  useEffect(() => {
    if (newData) {
      newData.forEach((pokemon) => {
        getPokemonBrief(pokemon);
      });
    }
  }, [newData]);

  return (
    <div className={styles.div}>
      <button onClick={getMorePokemons} className={styles.button}>
        CARREGAR MAIS
      </button>
    </div>
  );
};

export default Button;
