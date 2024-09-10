import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import useFetch from './hooks/useFetch';
import Option from './components/Option';

function App() {
  const url = 'https://pokeapi.co/api/v2/pokemon/';
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    async function getPokemons() {
      const { response, json } = await request(`${url}`);

      console.log(data);
    }

    getPokemons();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid-container">
      <Header />
      <h1 className="titulo">
        escolha seu pokemon <span>.</span>
      </h1>
      <section className="selecao">
        {data.map((pokemon) => (
          <Option key={pokemon.name} pokemon={pokemon} />
        ))}
      </section>
    </div>
  );
}

export default App;
