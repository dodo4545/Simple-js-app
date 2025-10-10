const pokemonRepository = (function () {
  let pokemonList = [];

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    if (item && typeof item === "object") {
      pokemonList.push(item);
    }
  }

  function loadList() {
    return fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((pokemon) => {
          add({
            name: pokemon.name,
            detailsUrl: pokemon.url,
          });
        });
      })
      .catch((error) => console.error(error));
  }

  function loadDetails(pokemon) {
    const url = pokemon.detailsUrl;
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        pokemon.height = details.height;
        pokemon.imgUrl = details.sprites.front_default;
      })
      .catch((error) => console.error(error));
  }

  function addListItem(pokemon) {
    const list = document.querySelector(".pokemon-list");
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");

    const button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");

    button.addEventListener("click", function () {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    list.appendChild(listItem);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      document.getElementById("pokemonModalLabel").innerText = pokemon.name;
      document.getElementById(
        "pokemonHeight"
      ).innerText = `Height: ${pokemon.height}`;
      document.getElementById("pokemonImage").src = pokemon.imgUrl;
      $("#pokemonModal").modal("show"); // Show the modal using Bootstrap
    });
  }

  return {
    getAll,
    add,
    addListItem,
    loadList,
    loadDetails,
  };
})();

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
