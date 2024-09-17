import styles from './Pokemon.module.css';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Evolution from './Evolution';

const Pokemon = () => {
  const statColors = [
    '#ed1c15',
    '#bd12f8',
    '#4299e1',
    '#ffbb55',
    '#f56565',
    '#00c68f',
  ];
  const [infos, setInfos] = useState();
  const [chainURL, setChainURL] = useState();
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

      // console.log('fetch pokemon, infos:', json);

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

        // console.log(speciesJson);

        if (response.ok && speciesJson) {
          sethabitat(speciesJson.habitat.name);
          setChainURL(speciesJson.evolution_chain.url);
        }
      }
    }

    getHabitat();
  }, [infos]);

  if (infos) {
    return (
      <>
        <section className={styles.sectionInfos}>
          <h1 className={`titulo`}>
            {infos.name} <span>nº {infos.id}</span>
          </h1>
          <div className={styles.divStats}>
            <div className={styles.bgDark}>
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
                      <span key={type.type.name}>{type.type.name}</span>
                    ))}
                  </div>
                </h4>
                <h4>
                  Habilidades{' '}
                  <div>
                    {infos.abilities.map((ability) => (
                      <span key={ability.ability.name}>
                        {ability.ability.name}
                      </span>
                    ))}
                  </div>
                </h4>
              </div>
              <div className={styles.divStatsValues}>
                {infos.stats.map((stat, index) => (
                  <div key={stat.stat.name} className={styles.divStat}>
                    <h4>{stat.stat.name}</h4>
                    <div className={styles.statBg}>
                      <div
                        className={styles.statBar}
                        style={{
                          backgroundColor: statColors[index],
                          width: stat.base_stat,
                        }}
                      ></div>
                    </div>
                    <h4>{stat.base_stat}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionInfos}>
          <h1 className={`titulo`}>
            evoluções <span>.</span>
          </h1>
          <div className={styles.divEvolutions}>
            <Evolution url={chainURL} />
          </div>
          <div className={styles.divButton}>
            <NavLink to="/">
              <button className={styles.button}>VOLTAR</button>
            </NavLink>
          </div>
        </section>
      </>
    );
  }
};

export default Pokemon;
