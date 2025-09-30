(function () {
  let modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");
  document.body.appendChild(modalContainer);

  // Function to create and show the modal with Pokémon details
  function showDetails(pokemon) {
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
    imageElement.src = pokemon.imageUrl; // Assuming imageUrl is a property of the Pokémon object
    imageElement.classList.add("pokemon-image");

    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
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

  // Export the showDetails function to be used elsewhere
  window.showDetails = showDetails;
})();

// Usage example
showDetails({
  name: "Pikachu",
  height: "4",
  imageUrl:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
});
