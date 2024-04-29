import initCriaInfos from "./cria-infos.js";

export default function initSelectChange() {
  const selected = document.querySelector("#form-select");

  selected.addEventListener("change", initCriaInfos);
}
