import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Pokemon from './components/PokemonPage/Pokemon';

function App() {
  return (
    <section className="grid-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/pokemon/*" element={<Pokemon />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
