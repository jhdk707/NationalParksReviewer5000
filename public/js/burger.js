// Get the burger button and navbar menu elements
const burger = document.querySelector(".navbar-burger");
const menu = document.querySelector(".navbar-menu");
const dropdown = document.querySelector(".navbar-dropdown");

// Add a click event listener to the burger button
burger.addEventListener("click", () => {
  // Toggle the 'is-active' class on both the burger button and navbar menu
  burger.classList.toggle("is-active");
  menu.classList.toggle("is-active");
});

// Add a click event listener to the "more" dropdown element
dropdown.addEventListener("click", () => {
  // Toggle the 'is-active' class on the dropdown
  dropdown.classList.toggle("is-active");
});
