/*
    Author: Sebastian Jaculbe - Credit: LearnWebCode (Brad Schiff)
    Created: February 14th, 2026
    Updated: February 15th, 2026
*/

let timer
let deleteFirstPhotoDelay

/* Fetches API with a Try...Catch */
async function start(){
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        createBreedList(data.message)
    } catch (e) {
        console.log("There was a problem fetching the breed list.")    
    }
}


start()

/* Creates a breed list for the user to interact with */
function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
            <option>Choose a dog breed</option>
            ${Object.keys(breedList).map(function (breed) {
                return `<option>${breed}</option>`
            }).join('')}
    </select>
    `
}

/* Fetches the specific dog breed based on the user's selection from the API */
async function loadByBreed(breed) {
    if (breed != "Choose a dog breed") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)  
        const data = await response.json()
        createSlideshow(data.message)
    }
}

/* Creates a slideshow of the available images for the selected dog breed */
function createSlideshow(images) {
    let currentPosition = 0
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)
    /* If...else statement handles the case if a specific breed has 1 to 2 images */
    if (images.length > 1) {
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>
        `
        currentPosition += 2
        if (images.length == 2) currentPosition = 0
        timer = setInterval(nextSlide, 3000)
    } else {
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide"></div>
        `
    }
    /* Changes the image for a few seconds by adding and removing images from the array */
    function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)
        deleteFirstPhotoDelay = setTimeout(function() {
            document.querySelector(".slide").remove()
        }, 1000)
        if (currentPosition + 1 >= images.length) {
            currentPosition = 0
        } else {
            currentPosition++
        }
    }
}