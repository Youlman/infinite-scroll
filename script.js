const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let isInitialLoad = true;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const initialCount = 5;
const apiKey='sh-AA0rSRbITP6TjfPYLPI6WnaimlLvNiQMvQQLIebg';
let  apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIURLWithNewCount(picturesCount){
    apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picturesCount}`;
}


//Load image

function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
    } 
}

//set Attributes function

function setAttributes(element, attributes) {
   for (const key in attributes) {
        element.setAttribute(key, attributes[key]);       
   }
    
}

//Display photos

function displayPhotos() {
    imagesLoaded=0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        //Create <a> 
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target','_blank');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        //create <img>
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        //Event listener check when load finished.
        img.addEventListener('load', imageLoaded);

        //Put <a> and <img> inside imageContainer

        item.appendChild(img);
        imageContainer.appendChild(item);
        
    })
}

//Get Photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) { 
            updateAPIURLWithNewCount(30) 
            isInitialLoad = false 
        } 
    } catch (error) {
        
    }
}

// If the scrolling is near the bottom of the page load mores pictures

window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready = false;
        getPhotos();
    }
})

getPhotos();