import { useEffect, useState } from 'react';
import styles from './Evolution.module.css';
import useBrief from '../../hooks/useBrief';
import PokemonItem from '../Pokemons/PokemonItem';

const Evolution = ({ url, setPokemonName }) => {
  const [evolutions, setEvolutions] = useState([]);
  const { pokemons, getPokemonBrief } = useBrief();

  //getEvolutions
  useEffect(() => {
    let evolution1;
    let evolution2;
    async function getEvolutions() {
      const response = await fetch(url);
      const json = await response.json();

      if (response.ok && json) {
        json.chain.evolves_to.forEach((element) => {
          // console.log(element);

          setEvolutions((prevEvolutions) => {
            // Cria um novo array concatenando o estado anterior com o novo valor
            const evolution1 = [...prevEvolutions, element.species];

            // Remove duplicados comparando a propriedade 'name' (ou outra que identifique o objeto)
            const uniqueEvolutions = evolution1.filter(
              (item, index, self) =>
                index === self.findIndex((e) => e.name === item.name), // ou 'id' se for um identificador único
            );

            // Retorna o array atualizado e sem duplicados
            return uniqueEvolutions;
          });
        });
      }
      // console.log('evolutions:', evolutions);
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
