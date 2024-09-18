import { useEffect, useState } from 'react';
import styles from './Evolution.module.css';
import useBrief from '../../hooks/useBrief';
import PokemonItem from '../Pokemons/PokemonItem';

const Evolution = ({ url, setPokemonName }) => {
  const [evolutions, setEvolutions] = useState([]);
  const { pokemons, getPokemonBrief } = useBrief();

  //getEvolutions
  useEffect(() => {
    async function getEvolutions() {
      const response = await fetch(url);
      const json = await response.json();

      console.log('evolutionFetch:', json);

      if (response.ok && json) {
        // Adiciona o primeiro nível de evolução: json.chain.species
        const initialSpecies = json.chain.species;

        json.chain.evolves_to.forEach((element) => {
          // Extrai evolution2 do caminho json.chain.evolves_to.evolves_to.species
          const evolution2 = element.evolves_to.map(
            (evolution) => evolution.species,
          );

          setEvolutions((prevEvolutions) => {
            // Cria um novo array com json.chain.species, element.species e evolution2
            const newEvolutions = [
              ...prevEvolutions,
              initialSpecies, // Primeira evolução (json.chain.species)
              element.species, // Segunda evolução (element.species)
              ...evolution2, // Terceira evolução (json.chain.evolves_to.evolves_to.species)
            ];

            // Remove duplicados comparando a propriedade 'name'
            const uniqueEvolutions = newEvolutions.filter(
              (item, index, self) =>
                index === self.findIndex((e) => e.name === item.name),
            );

            // Organiza pelo número extraído do final da URL
            const sortedEvolutions = uniqueEvolutions.sort((a, b) => {
              const idA = parseInt(a.url.match(/\/(\d+)\/$/)[1]);
              const idB = parseInt(b.url.match(/\/(\d+)\/$/)[1]);
              return idA - idB;
            });

            // Retorna o array atualizado e sem duplicados, organizado
            return sortedEvolutions;
          });
        });
      }
    }

    if (url) getEvolutions();
  }, [url]);

  // Executar a função getPokemonBrief para cada URL para pegar resumo de cada pokemon
  useEffect(() => {
    if (evolutions) {
      evolutions.forEach((pokemon) => {
        getPokemonBrief(pokemon);
      });
    }
  }, [evolutions]);

  return (
    <div className={styles.evolucao}>
      {pokemons.map((pokemon) => (
        <PokemonItem
          key={pokemon.name}
          pokemon={pokemon}
          setPokemonName={setPokemonName}
        />
      ))}
    </div>
  );
};

export default Evolution;
