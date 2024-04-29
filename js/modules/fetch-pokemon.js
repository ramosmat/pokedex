export default async function initFetchPokemons() {
  const url = "https://pokeapi.co/api/v2/pokemon/";

  const selected = document.querySelector("#pokemons");

  const pokeSelected = selected.value;

  const pokemons = await fetch(url);
  const pokemonsJson = await pokemons.json();
  const pokemonArray = Array.from(pokemonsJson.results); //Pegar o value que foi selecionado no select

  for (let i = 0; i < pokemonArray.length; i++) {
    if (pokemonArray[i].name === pokeSelected) {
      const poke = await fetch(pokemonArray[i].url);
      const pokeJson = await poke.json(); //pegar height, weight e types

      const species = await fetch(pokeJson.species.url);
      const speciesJson = await species.json(); //pegar o habitat

      const pokemonInfos = {
        pokeJson: pokeJson, //pegar height, weight e types
        speciesJson: speciesJson, //pegar o habitat
      };

      return pokemonInfos;
    }
  }
}
