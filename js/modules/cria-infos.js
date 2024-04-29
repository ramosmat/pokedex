import initFetchPokemons from "./fetch-pokemon.js";

export default async function initCriaInfos() {
  const divInfos = document.querySelector(".informacoes");
  const divImg = document.querySelector("[data-img]");
  divInfos.classList.add("ativo");
  divImg.classList.add("ativo");

  const fetchInfos = await initFetchPokemons();
  let pokemonInfos = {
    types: [],
  };

  pokemonInfos.height = fetchInfos.pokeJson.height;
  pokemonInfos.weight = fetchInfos.pokeJson.weight;
  pokemonInfos.habitat = fetchInfos.speciesJson.habitat.name;
  pokemonInfos.sprite =
    fetchInfos.pokeJson.sprites.other.showdown.front_default;

  fetchInfos.pokeJson.types.forEach((type) => {
    pokemonInfos.types.push(type.type.name);
  });

  fetchInfos.pokeJson.stats.forEach((statParam) => {
    const statName = statParam.stat.name;
    const statValue = statParam.base_stat;

    pokemonInfos[statName] = statValue;
  });

  // console.log(pokemonInfos);

  //FAZER UM FOREACH PARA CADA DIV IGUAL FIZ NA ARTICLE DE STATUS
  const img = document.querySelector("#pokemon-img");
  img.src = pokemonInfos.sprite;

  const divAltura = document.querySelector(".altura p");
  divAltura.innerText = pokemonInfos.height;

  const divPeso = document.querySelector(".peso p");
  divPeso.innerText = pokemonInfos.weight;

  const divHabitat = document.querySelector(".habitat p");
  divHabitat.innerText =
    pokemonInfos.habitat.charAt(0).toUpperCase() +
    pokemonInfos.habitat.slice(1);

  const tipos = document.querySelector("#art2 p");
  tipos.innerText = "";

  for (let i = 0; i < pokemonInfos.types.length; i++) {
    let tipo =
      pokemonInfos.types[i].charAt(0).toUpperCase() +
      pokemonInfos.types[i].slice(1);
    pokemonInfos.types[i] = tipo;
  }

  tipos.innerText = pokemonInfos.types;

  const divStats = document.querySelectorAll(".stats");
  const cores = [
    "#F56565",
    "#6B347E",
    "#4299E1",
    "#FFBB55",
    "#C25450",
    "#00C68F",
  ];

  divStats.forEach((div, index) => {
    const statId = div.children[1].id;

    div.children[1].children[0].style.width = pokemonInfos[statId] + "px";
    div.children[1].children[0].style.height = 10 + "px";
    div.children[1].children[0].style.backgroundColor = cores[index];
    div.children[1].children[0].style.zIndex = 200;

    div.children[2].innerText = pokemonInfos[statId];
  });
}
