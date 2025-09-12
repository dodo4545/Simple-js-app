const pokemonList = [];

// Adding Pokémon objects to the array
pokemonList.push({
  name: "Bulbasaur",
  height: 7,
  types: ["grass", "poison"],
});

pokemonList.push({
  name: "Charizard",
  height: 17,
  types: ["fire", "flying"],
});

pokemonList.push({
  name: "Squirtle",
  height: 5,
  types: ["water"],
});

// Loop through each Pokémon in the pokemonList array
for (let i = 0; i < pokemonList.length; i++) {
  const pokemon = pokemonList[i]; // Get the current Pokémon object
  let output = `${pokemon.name} (height: ${pokemon.height})`; // Create the output string

  // Conditional to check if the height is above a certain value
  if (pokemon.height > 10) {
    // You can change the value 10 to whatever you prefer
    output += " - Wow, that’s big!"; // Add the special note if the condition is met
  }

  // Write the output to the DOM
  document.write(output + "<br>"); // Use <br> for line breaks
}


