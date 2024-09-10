import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import useFetch from './hooks/useFetch';

function App() {
  const url = 'https://pokeapi.co/api/v2/pokemon/';
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    async function getPokemons() {
      const { response, json } = await request(url);
    }

    getPokemons();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid-container">
      <Header />
    </div>
  );
}

export default App;
