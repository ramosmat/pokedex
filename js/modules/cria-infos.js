import initFetchPokemons from "./fetch-pokemon.js";

//BOLAR UM JEITO DE TRAZER OS OBJETOS DO OUTRO ARQUIVO PARA ESTE
export default function initCriaInfos() {
  initFetchPokemons();

  let pokemonStat = [];
  let pokemonInfos = {
    types: [],
  };

  pokemonInfos.height = pokeJson.height;
  pokemonInfos.weight = pokeJson.weight;
  pokemonInfos.habitat = speciesJson.habitat.name;

  pokeJson.types.forEach((type) => {
    pokemonInfos.types.push(type.type.name);
  });

  pokeJson.stats.forEach((statParam) => {
    //Adicionando stats na Array pokemonStat
    const newStats = {
      statName: statParam.stat.name,
      value: statParam.base_stat,
    };
    pokemonStat.push(newStats);
  });
}
