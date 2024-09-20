import { useEffect, useState, createContext } from 'react';
import useFetch from './hooks/useFetch';
import useBrief from './hooks/useBrief';

export const UserContext = createContext();

export const PokemonStorage = ({ children }) => {
  const url = 'https://pokeapi.co/api/v2/pokemon/';
  const { data, loading, request } = useFetch();
  const { pokemonsList, getPokemonBrief } = useBrief();

  // Pegar os primeiros pokemons da API
  useEffect(() => {
    async function getPokemons() {
      const { json } = await request(`${url}?limit=1310`); // Retorna name e url dos pokemons
    }

    getPokemons();
  }, []);

  // Executar a função getPokemonBrief para cada URL para pegar resumo de cada pokemon
  useEffect(() => {
    if (data) {
      data.forEach((pokemon) => {
        getPokemonBrief(pokemon);
      });
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ loading, pokemonsList, getPokemonBrief }}>
      {children}
    </UserContext.Provider>
  );
};
