export default async function initCriaOpcoes() {
  const url = "https://pokeapi.co/api/v2/pokemon/";

  const pokemons = await fetch(url);
  const pokemonsJson = await pokemons.json();
  const pokemonArray = Array.from(pokemonsJson.results);

  const select = document.querySelector("#pokemons");

  pokemonArray.forEach((item) => {
    const newPokemon = document.createElement("option");
    const itemName = item.name;

    newPokemon.value = itemName;
    newPokemon.innerText = itemName.charAt(0).toUpperCase() + itemName.slice(1);

    select.appendChild(newPokemon);
  });
}
