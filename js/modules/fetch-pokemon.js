export default async function initFetchPokemons() {
  const url = "https://pokeapi.co/api/v2/pokemon/";

  async function getPokemons(url) {}

  // let pokemonStat = [];
  // let pokemonInfos = {
  //   types: [],
  // };

  const pokemons = await fetch(url);
  const pokemonsJson = await pokemons.json();
  const pokemonArray = Array.from(pokemonsJson.results)[0];

  const poke = await fetch(pokemonArray.url);
  const pokeJson = await poke.json(); //pegar height, weight e types

  const species = await fetch(pokeJson.species.url);
  const speciesJson = await species.json(); //pegar o habitat

  // pokemonInfos.height = pokeJson.height;
  // pokemonInfos.weight = pokeJson.weight;
  // pokemonInfos.habitat = speciesJson.habitat.name;

  // pokeJson.types.forEach((type) => {
  //   pokemonInfos.types.push(type.type.name);
  // });

  // pokeJson.stats.forEach((statParam) => {
  //   //Adicionando stats na Array pokemonStat
  //   const newStats = {
  //     statName: statParam.stat.name,
  //     value: statParam.base_stat,
  //   };
  //   pokemonStat.push(newStats);
  // });

  getPokemons(url);
}
