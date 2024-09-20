import styles from './Home.module.css';
import { useContext, useEffect, useState } from 'react';
import PokemonItem from './Pokemons/PokemonItem';
import { UserContext } from '../UserContext';

const Home = ({ setPokemonName }) => {
  const { loading, pokemonsList } = useContext(UserContext);
  const [dados, setDados] = useState();
  const [currentIndex, setCurrentIndex] = useState(10);
  const [search, setSearch] = useState('');

  //setDados para os primeiros pokemons de pokemonsList
  useEffect(() => {
    if (pokemonsList) {
      setDados(pokemonsList.slice(0, 10));
    }
  }, [pokemonsList]);

  function getMorePokemons() {
    // Determina o próximo grupo de 20 objetos
    const novosDados = pokemonsList.slice(currentIndex, currentIndex + 10);

    // Atualiza o estado 'dados' adicionando os novos objetos
    setDados((prevDados) => [...prevDados, ...novosDados]);

    // Atualiza o índice atual
    setCurrentIndex((prevIndex) => prevIndex + 10);
  }

  useEffect(() => {
    if (search === '') {
      // Se o campo de pesquisa estiver vazio, voltar aos dados iniciais
      setDados(pokemonsList.slice(0, currentIndex));
    }
    if (search !== '') {
      const pokemons = pokemonsList.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
          String(pokemon.num).includes(search.toLocaleLowerCase()),
      );

      setDados(pokemons);
    }
  }, [search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (dados) {
    return (
      <section className={styles.sectionSel}>
        <div className={styles.divTitulo}>
          <h1 className="titulo">
            escolha seu pokemon <span>.</span>
          </h1>

          <div className={styles.inputWrapper}>
            <input
              type="search"
              placeholder="Pesquise por nome ou número"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.divSel}>
          <ul className={styles.selecao}>
            {dados.map((pokemon) => (
              <PokemonItem
                key={pokemon.name}
                pokemon={pokemon}
                setPokemonName={setPokemonName}
              />
            ))}
          </ul>
          <div className={styles.divButton}>
            <button onClick={getMorePokemons} className={styles.button}>
              CARREGAR MAIS
            </button>
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default Home;
