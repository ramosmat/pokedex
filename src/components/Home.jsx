import styles from './Home.module.css';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import useBrief from '../hooks/useBrief';
import PokemonItem from './Pokemons/PokemonItem';
import Button from './Helper/Button';

const Home = ({ setPokemonName }) => {
  const url = 'https://pokeapi.co/api/v2/pokemon/';
  const { data, loading, request } = useFetch();
  const { pokemons, getPokemonBrief } = useBrief();
  const [nextPage, setNextPage] = useState();

  // Pegar os primeiros pokemons da API
  useEffect(() => {
    async function getPokemons() {
      const { json } = await request(`${url}?limit=10`); // Retorna name e url dos pokemons

      // console.log('primeiro fetch:', json);
      setNextPage(json.next);
    }

    getPokemons();
  }, [request, url]);

  // Executar a função getPokemonBrief para cada URL para pegar resumo de cada pokemon
  useEffect(() => {
    if (data) {
      data.forEach((pokemon) => {
        getPokemonBrief(pokemon);
      });
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data && pokemons) {
    return (
      <section className={styles.sectionSel}>
        <h1 className="titulo">
          escolha seu pokemon <span>.</span>
        </h1>
        <div className={styles.divSel}>
          <div className={styles.selecao}>
            {pokemons.map((pokemon) => (
              <PokemonItem
                key={pokemon.name}
                pokemon={pokemon}
                setPokemonName={setPokemonName}
              />
            ))}
          </div>
          <Button
            nextPage={nextPage}
            setNextPage={setNextPage}
            getPokemonBrief={getPokemonBrief}
            text="CARREGAR MAIS"
          />
        </div>
      </section>
    );
  }

  return null;
};

export default Home;
