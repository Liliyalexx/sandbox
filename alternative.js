import * as Carousel from "./Carousel.js";
import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_iOZeUBHc7COor4ZnKtY09BUBgr4hkhD85REYI6lxXW0vDDKFs83MAXZ9XRIOBFyY";
axios.defaults.headers.common["x-api-key"] = API_KEY;
axios.defaults.baseURL = "https://api.thecatapi.com/v1";

// 1. Create an async function "initialLoad" that does the following:
async function initialLoad() {
  try {
    const response = await axios.get("/breeds");
    const breeds = response.data;
    console.log(breeds);

    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    // Load initial breed info and carousel
    if (breeds.length > 0) {
      loadBreedInfo(breeds[0].id);
    }
  } catch (err) {
    console.error(err);
  }
}

initialLoad();

// 2. Create an event handler for breedSelect that does the following:
async function loadBreedInfo(breedId) {
  try {
    const response = await axios.get("/images/search", {
      params: {
        limit: 10,
        breed_ids: breedId,
      },
    });

    const images = response.data;
    console.log(images);

    // Clear previous carousel items and info section
    Carousel.clear();
    infoDump.innerHTML = "";

    // Create new carousel items and populate info
    images.forEach((image) => {
      const carouselItem = Carousel.createCarouselItem(image.url, image.alt, image.id);
      Carousel.appendCarousel(carouselItem);
    });

    // Example: Update info section with breed details (customize as needed)
    const breedInfo = `Selected breed: ${breedId}`;
    const infoElement = document.createElement("p");
    infoElement.textContent = breedInfo;
    infoDump.appendChild(infoElement);

    // Restart carousel if needed
    Carousel.start();
  } catch (err) {
    console.error(err);
  }
}

breedSelect.addEventListener("change", (event) => {
  const selectedBreedId = breedSelect.value;
  loadBreedInfo(selectedBreedId);
});
