import styles from './Pokemon.module.css';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Evolution from './Evolution';

const Pokemon = ({ pokemonName, setPokemonName }) => {
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

  const url = 'https://pokeapi.co/api/v2/pokemon/';

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

    if (pokemonName) getInfos();
  }, [pokemonName]);

  //habitat
  useEffect(() => {
    async function getHabitat() {
      if (infos) {
        const response = await fetch(infos.species.url);
        const speciesJson = await response.json();

        // console.log('speciesJson:', speciesJson);

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
                {infos.sprites.other.showdown.front_default ? (
                  <img
                    src={infos.sprites.other.showdown.front_default}
                    alt="pokemon"
                  />
                ) : (
                  <img
                    src={infos.sprites.other.dream_world.front_default}
                    alt="pokemon"
                  />
                )}
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

        {chainURL ? (
          <section className={styles.sectionEvolution}>
            <h1 className={`titulo`}>
              Cadeia de evoluções <span>.</span>
            </h1>
            <div className={styles.divEvolutions}>
              <Evolution url={chainURL} setPokemonName={setPokemonName} />
            </div>
            <div className={styles.divButton}>
              <NavLink to="/">
                <button className={styles.button}>VOLTAR</button>
              </NavLink>
            </div>
          </section>
        ) : (
          ''
        )}
      </>
    );
  }
};

export default Pokemon;
