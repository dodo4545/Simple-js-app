const pokemonRepository = (function () {
  let pokemonList = [];

  let modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");
  document.body.appendChild(modalContainer);

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
      // Clear any existing modal content
      modalContainer.innerHTML = "";

      // Create and append modal content
      let modal = document.createElement("div");
      modal.classList.add("modal");

      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("modal-close");
      closeButtonElement.innerText = "Close";
      closeButtonElement.addEventListener("click", hideModal);

      let nameElement = document.createElement("h1");
      nameElement.innerText = pokemon.name;

      let heightElement = document.createElement("p");
      heightElement.innerText = `Height: ${pokemon.height}`;

      let imageElement = document.createElement("img");
      imageElement.src = pokemon.imgUrl; // Assuming imageUrl is a property of the Pokémon object
      imageElement.classList.add("pokemon-image");

      modal.appendChild(closeButtonElement);
      modal.appendChild(nameElement);
      modal.appendChild(heightElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add("is-visible");
    });
  }

  // Function to hide the modal
  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  // Close modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target === modalContainer) {
      hideModal();
    }
  });

  // Close modal when pressing the Escape key
  window.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      modalContainer.classList.contains("is-visible")
    ) {
      hideModal();
    }
  });

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
