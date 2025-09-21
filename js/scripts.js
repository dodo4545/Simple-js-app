// IIFE to encapsulate the pokemonList and expose functions
let pokemonRepository = (function () {
  // Private array to store Pokémon
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

  // Public function to return all Pokémon
  function getAll() {
    return pokemonList;
  }

  // Public function to add a Pokémon
  function add(item) {
    if (typeof item === "object" && "name" in item) {
      pokemonList.push(item);
    } else {
      console.log("Invalid Pokémon item");
    }
  }

  // Expose public methods
  return {
    getAll: getAll,
    add: add,
  };
})();

// Using forEach() to iterate over each Pokémon
pokemonRepository.getAll().forEach(function (pokemon) {
  let output = `${pokemon.name} (height: ${pokemon.height})`;

  // Conditional to check if the height is above a certain value
  if (pokemon.height > 10) {
    output += " - Wow, that’s big!";
  }

  // Write the output to the DOM
  document.write(output + "<br>"); // Use <br> for line breaks
});

// Example of adding a new Pokémon
pokemonRepository.add({
  name: "Pikachu",
  height: 4,
  types: ["electric"],
});
