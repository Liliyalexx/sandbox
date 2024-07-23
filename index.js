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
const API_KEY =
 "live_iOZeUBHc7COor4ZnKtY09BUBgr4hkhD85REYI6lxXW0vDDKFs83MAXZ9XRIOBFyY";
axios.defaults.headers.common["x-api-key"] = API_KEY;
const BASE_URL = `https://api.thecatapi.com/v1/breeds`;


/**
* 1. Create an async function "initialLoad" that does the following:
* - Retrieve a list of breeds from the cat API using fetch().
* - Create new <options> for each of these breeds, and append them to breedSelect.
*  - Each option should have a value attribute equal to the id of the breed.
*  - Each option should display text equal to the name of the breed.
* This function should execute immediately.
*/
async function initialLoad() {
 try {
   let response = await fetch(BASE_URL, {
     header: {
       "x-api-key": API_KEY,
     },
   });
   if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`);
   }


   let data = await response.json();
   console.log(data);
   data.forEach((breed) => {
     const option = document.createElement("option");
     option.value = breed.id;
     option.textContent = breed.name;
     breedSelect.appendChild(option);
   });
 } catch (err) {
   console.error(err);
 }
}
initialLoad();


/**
* 2. Create an event handler for breedSelect that does the following:
* - Retrieve information on the selected breed from the cat API using fetch().
*  - Make sure your request is receiving multiple array items!
*  - Check the API documentation if you're only getting a single object.
* - For each object in the response array, create a new element for the carousel.
*  - Append each of these new elements to the carousel.
* - Use the other data you have been given to create an informational section within the infoDump element.
*  - Be creative with how you create DOM elements and HTML.
*  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
*  - Remember that functionality comes first, but user experience and design are important.
* - Each new selection should clear, re-populate, and restart the Carousel.
* - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
*/


breedSelect.addEventListener("change", async (event) => {
 const selectedBreedId = breedSelect.value;
 try {
   const response = await axios.get(
     `https://api.thecatapi.com/v1/images/search`,
     {
       params: {
         limit: 10,
         breed_ids: selectedBreedId,
       },
     }
   );


   if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`);
   }


   const images = await response.data();
   console.log(images);


   // Clear previous carousel items and info section
   Carousel.clear();
   infoDump.innerHTML = ""; // Clear existing info


   // Create new carousel items and populate info
   images.forEach((image) => {
     const carouselItem = Carousel.createCarouselItem(
       image.url,
       image.alt,
       image.id
     );
     Carousel.appendCarousel(carouselItem);
   });


   // Example: Update info section with breed details (customize as needed)
   const breedInfo = `Selected breed: ${selectedBreedId}`;
   const infoElement = document.createElement("p");
   infoElement.textContent = breedInfo;
   infoDump.appendChild(infoElement);


   // Restart carousel if needed
   Carousel.start();
 } catch (err) {
   console.error(err);
 }
});
/**
* 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
*/
/**
* 4. Change all of your fetch() functions to axios!
* - axios has already been imported for you within index.js.
* - If you've done everything correctly up to this point, this should be simple.
* - If it is not simple, take a moment to re-evaluate your original code.
* - Hint: Axios has the ability to set default headers. Use this to your advantage
*   by setting a default header with your API key so that you do not have to
*   send it manually with all of your requests! You can also set a default base URL!
*/


export async function favourite(imgId) {
 // your code here
}
