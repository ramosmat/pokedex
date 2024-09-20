import { useCallback, useState, useEffect } from 'react';

const useBrief = () => {
  const [pokemonsList, setPokemonsList] = useState([]);
  const url = 'https://pokeapi.co/api/v2/pokemon/';

  const getPokemonBrief = useCallback(async (pokemon) => {
    let num;
    let name;
    let types;
    let img;
    let newDados;

    const dados = await fetch(`${url}${pokemon.name}`);
    const json = await dados.json();

    if (dados.ok && json) {
      num = json.id;
      name = json.name;
      types = [...json.types];
      // img = json.sprites.other.dream_world.front_default;
      img = json.sprites.other['official-artwork'].front_default;

      newDados = {
        num,
        name,
        types,
        img,
      };

      // Usar a função de atualização para garantir que estamos atualizando o estado corretamente
      setPokemonsList((prevPokemons) => {
        // Cria um novo array concatenando o estado anterior com os novos dados
        const updatedPokemons = [...prevPokemons, newDados];

        // Remove duplicados comparando a propriedade `num`
        const uniquePokemons = updatedPokemons.filter(
          (item, index, self) =>
            index === self.findIndex((p) => p.num === item.num),
        );

        // Ordena o array pelo valor do parâmetro `num` em ordem crescente
        return uniquePokemons.sort((a, b) => a.num - b.num);
      });
    }
  }, []);

  return { pokemonsList, getPokemonBrief };
};

export default useBrief;
