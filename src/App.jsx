import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Pokemon from './components/PokemonPage/Pokemon';
import { useState } from 'react';

function App() {
  const [pokemonName, setPokemonName] = useState();

  return (
    <section className="grid-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="pokemon/*"
            element={
              <Pokemon
                pokemonName={pokemonName}
                setPokemonName={setPokemonName}
              />
            }
          />
          <Route path="*" element={<Home setPokemonName={setPokemonName} />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
