const pokemonRepository = (function () {
  let pokemonList = [];

  function getAll() {
    return pokemonList; // return the pokemonList array
  }

  function add(item) {
    if (item && typeof item === "object") {
      pokemonList.push(item); // add the Pokémon to the pokemonList array
    }
  }

  // Load the complete list of Pokémon from the API
  function loadList() {
    return (
      fetch("https://pokeapi.co/api/v2/pokemon/")
        // limit to 150 for simplicity
        .then((response) => response.json())
        .then((data) => {
          data.results.forEach((pokemon) => {
            add({
              name: pokemon.name,
              detailsUrl: pokemon.url, // Store the URL for details
            });
          });
        })
        .catch((error) => console.error(error))
    );
  }

  // Load details for a specific Pokémon
  function loadDetails(pokemon) {
    const url = pokemon.detailsUrl; // Use the URL from the Pokémon object
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        // Assign details to the Pokémon object
        pokemon.height = details.height;
        pokemon.imgUrl = details.sprites.front_default; // Assign image URL
      })
      .catch((error) => console.error(error));
  }

  // Function to add a list item to the DOM for each Pokémon
  function addListItem(pokemon) {
    const list = document.querySelector(".pokemon-list"); // Assuming there's a ul with class "pokemon-list"
    const listItem = document.createElement("li");
    const button = document.createElement("button");

    button.innerText = pokemon.name; // Set button text to Pokémon name
    button.classList.add("pokemon-button"); // Optional: add a class for styling

    // Add button to the list item
    listItem.appendChild(button);

    // Call the function to add an event listener to the button
    addButtonListener(button, pokemon);

    list.appendChild(listItem); // Append list item to the list
  }

  // Function to add an event listener to the button
  function addButtonListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon); // Call showDetails with the current Pokémon
    });
  }

  // Function to show details of the Pokémon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      console.log(pokemon); // Log the Pokémon object with updated details
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList, // Expose loadList function
    loadDetails: loadDetails, // Expose loadDetails function
  };
})();

// Load the Pokémon list and render it
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon); // Call addListItem for each Pokémon
  });
});
