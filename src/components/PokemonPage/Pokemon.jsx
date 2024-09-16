import styles from './Pokemon.module.css';
import { useState, useEffect } from 'react';
import Button from '../Helper/Button';
import { NavLink } from 'react-router-dom';

const Pokemon = () => {
  const [infos, setInfos] = useState();
  const [chain, setChain] = useState();
  const [habitat, sethabitat] = useState();
  // const [evolution1, setEvolution1] = useState();
  // const [evolution2, setEvolution2] = useState();
  const url = 'https://pokeapi.co/api/v2/pokemon/';

  //Get only the pokemon name from url
  const pokemonName = window.location.href.split('/').pop();

  //Retorna infos do pokemon
  useEffect(() => {
    async function getInfos() {
      const response = await fetch(`${url}${pokemonName}`);
      const json = await response.json();

      console.log('fetch pokemon, infos:', json);

      if (response.ok && json) {
        setInfos(json);
      }
    }

    getInfos();
  }, []);

  //habitat
  useEffect(() => {
    async function getHabitat() {
      if (infos) {
        const response = await fetch(infos.species.url);
        const speciesJson = await response.json();

        if (response.ok && speciesJson) {
          sethabitat(speciesJson.habitat.name);
        }
      }
    }

    getHabitat();
  }, [infos]);

  if (infos) {
    return (
      <section className={styles.sectionInfos}>
        <h1 className={styles.titulo}>
          {infos.name} <span>nº {infos.id}</span>
        </h1>
        <div className={styles.divStats}>
          <div className={styles.bgBlack}>
            <div className={styles.divImg}>
              <img
                src={infos.sprites.other.showdown.front_default}
                alt="pokemon"
              />
            </div>
            <div className={styles.qualities}>
              <h4>
                Altura <span>{infos.height}</span>
              </h4>
              <h4>
                Peso <span>{infos.weight}</span>
              </h4>

              <h4>
                Habitat
                <div>
                  <span>{habitat}</span>
                </div>
              </h4>
              <h4>
                Tipo{' '}
                <div>
                  {infos.types.map((type) => (
                    <span>{type.type.name}</span>
                  ))}
                </div>
              </h4>
              <h4>
                Habilidades{' '}
                <div>
                  {infos.abilities.map((ability) => (
                    <span>{ability.ability.name}</span>
                  ))}
                </div>
              </h4>
            </div>
          </div>
        </div>
        <div className={styles.divButton}>
          <NavLink to="/">
            <button className={styles.button}>VOLTAR</button>
          </NavLink>
        </div>
      </section>
    );
  }
};

export default Pokemon;
