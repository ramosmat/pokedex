import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Pokemon from './components/PokemonPage/Pokemon';
import { useState } from 'react';
import { PokemonStorage } from './UserContext';

function App() {
  const [pokemonName, setPokemonName] = useState();

  return (
    <section className="grid-container">
      <BrowserRouter>
        <PokemonStorage>
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
            <Route
              path="*"
              element={<Home setPokemonName={setPokemonName} />}
            />
          </Routes>
        </PokemonStorage>
      </BrowserRouter>
    </section>
  );
}

export default App;
