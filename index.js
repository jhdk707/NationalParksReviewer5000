import { getNationalParks } from "./natlprksapi.js"; // Import API functions from natlprksapi.js

const apiKey = process.env.API_KEY;
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const parkList = document.getElementById("park-list");

// Add an event listener to the search button to initiate the search
searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim();
  getNationalParks(apiKey, searchTerm)
    .then((data) => {
      // Clear the previous results from the parkList
      parkList.innerHTML = "";

      // Create a list item for each park and append it to the parkList
      data.forEach((park) => {
        const listItem = document.createElement("li");
        listItem.textContent = park.fullName;
        parkList.appendChild(listItem);
      });
    })
    .catch((error) => console.error(error));
});
