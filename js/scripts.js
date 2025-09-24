const pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 7,
      types: ["grass", "poison"],
    },
    {
      name: "Charizard",
      height: 17,
      types: ["fire", "flying"],
    },
    {
      name: "Squirtle",
      height: 5,
      types: ["water"],
    },
  ];

  function getAll() {
    return pokemonList; // return the pokemonList array
  }

  function add(item) {
    if (item && typeof item === "object") {
      pokemonList.push(item); // add the Pokémon to the pokemonList array
    }
  }

  // Function to add a list item to the DOM for each Pokémon
  function addListItem(pokemon) {
    const list = document.querySelector(".pokemon-list"); // Assuming there's a ul with class "pokemon-list"

    // Create a list item and button for each Pokémon
    const listItem = document.createElement("li");
    const button = document.createElement("button");

    button.innerText = pokemon.name; // Set button text to Pokémon name
    button.classList.add("pokemon-button"); // Optional: add a class for styling

    // Add button to the list item
    listItem.appendChild(button); // Append button to list item

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
    console.log(pokemon); // Log the Pokémon object to the console
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem, // Expose addListItem function
  };
})();

// Using forEach to loop through each Pokémon in the repository and add to the DOM
pokemonRepository.getAll().forEach((pokemon) => {
  pokemonRepository.addListItem(pokemon); // Call addListItem for each Pokémon
});
