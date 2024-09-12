import React, { useEffect, useState } from 'react';
import useFetch from './useFetch';

const useInfos = ({ pokemons, pokemonSelected }) => {
  const { loading, error, request } = useFetch();
  const [infos, setInfos] = useState(null);
  const [encounters, setEncounters] = useState();

  useEffect(() => {
    async function getEncounters(url) {
      const { response, json } = await request(url);

      setEncounters(json);
    }

    async function getPokemon(url) {
      const { response, json } = await request(url);

      if (response.ok && json) {
        const img = json.sprites.other.showdown.front_default;
        const abilities = json.abilities;
        const height = json.height;
        const weight = json.weight;
        const types = json.types;
        const stats = json.stats;
        const encounters_url = json.location_area_encounters;

        if (encounters_url) {
          getEncounters(encounters_url);
        }

        setInfos({
          img,
          abilities,
          height,
          weight,
          stats,
          types,
          encounters,
        });
      }
    }

    if (pokemonSelected) {
      const url = pokemons.filter(
        (pokemon) => pokemon.name === pokemonSelected,
      )[0].url;

      getPokemon(url);
    }
  }, [pokemonSelected]);

  if (infos) {
    return { infos };
  }
};

export default useInfos;
