import styles from './Home.module.css';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import Option from './Pokemons/Option';

const Home = () => {
  const [pokemonSelected, setPokemonSelected] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const url = 'https://pokeapi.co/api/v2/pokemon/';
  const { data, loading, request } = useFetch();

  async function getPokemonBrief(pokemon) {
    let num;
    let name;
    let types;
    let img;
    let newDados;

    const dados = await fetch(pokemon.url);
    const json = await dados.json();

    if (dados.ok && json) {
      num = json.id;
      name = json.name;
      types = [...json.types];
      img = json.sprites.other.dream_world.front_default;

      newDados = {
        num,
        name,
        types,
        img,
      };

      // Usar a função de atualização para garantir que estamos atualizando o estado corretamente
      setPokemons((prevPokemons) => {
        const updatedPokemons = [...prevPokemons, newDados];

        // Ordena o array pelo valor do parâmetro `num` em ordem crescente
        return updatedPokemons.sort((a, b) => a.num - b.num);
      });
    }
  }

  // Pegar os primeiros pokemons da API
  useEffect(() => {
    async function getPokemons() {
      const { json } = await request(`${url}`); // Retorna name e url dos pokemons
    }

    getPokemons();
  }, [request, url]);

  // Executar a função getPokemonBrief para cada URL
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
        <h1 className={styles.titulo}>
          escolha seu pokemon <span>.</span>
        </h1>
        <div className={styles.divSel}>
          <div className={styles.selecao}>
            {pokemons.map((pokemon) => (
              <Option
                key={pokemon.name}
                pokemon={pokemon}
                setpokemonSelected={setPokemonSelected}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default Home;
