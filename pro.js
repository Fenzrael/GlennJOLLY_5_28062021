// Javascript Photographer Page

// Variables
const params = new URLSearchParams(document.location.search.substring(1));

const photographerId = params.get("photographerId");

const test = document.querySelector(".test");

const likeButton = document.getElementsByClassName("legend__icon");
const likeCount = document.getElementsByClassName("legend__likes");

const gallery = document.getElementById("gallery");
const presentationPhotographer = document.getElementById("presentation");

const modal = document.querySelector(".modal");
const cross = document.querySelector(".modal__cross");

const boxHeart = document.getElementById("boxHeart");

const pathToImgDirectory = "./img/";

// Import Photographers media
const currentUserMedia = [];
console.log(currentUserMedia);
// Import photographers details
let currentUserDetails = {};
console.log(currentUserDetails);
let userData = [];

// Import data of data.json

const userMedia = async () => {
  await fetch("./data.json")
    .then((res) => res.json())
    .then((data) => (userData = data));

  console.log(userData);
};

const userDisplay = async () => {
  await userMedia();

  userData.media.forEach((media) => {
    if (media.photographerId == photographerId) {
      currentUserMedia.push(media);
    }
  });

  //Sort by default
  currentUserMedia.sort(function (a, b) {
    return b.likes - a.likes;
  });

  for (let i = 0; i < userData.photographers.length; i++) {
    let photographer = userData.photographers[i];

    if (photographer.id == photographerId) {
      currentUserDetails = photographer;
      break;
    }
  }
  constructMediaHtml();
  constructInfoPhotographer(currentUserDetails, filterTags(currentUserDetails));
  constructBoxTotalHeart(currentUserDetails, totalHeart(currentUserMedia));
};

userDisplay();

function constructMediaHtml() {
  gallery.innerHTML = ""; // rerender(rerendre le contenu (reorganisation donnees))
  currentUserMedia.forEach((media) => {
    gallery.innerHTML += `
    <figure class="gallery__photo photo"> 
    ${mediaFactory(media)}
    <figcaption class="legend">
    ${media.title}<span class="legend__likes">${media.likes}</span
    ><span class="fas fa-heart legend__icon" onclick="incrementLikes(${
      media.id
    })" aria-label="likes"></span>
    </figcaption>
    </figure>`;
  });
}

// Implement sort

const selectFilter = document.getElementById("filter");
selectFilter.addEventListener("change", function (e) {
  if (e.target.value === "Popularity") {
    currentUserMedia.sort(function (a, b) {
      return b.likes - a.likes;
    });
  } else if (e.target.value === "Date") {
    currentUserMedia.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  } else if (e.target.value === "Title") {
    currentUserMedia.sort(function (a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }

  constructMediaHtml();
});

//incrementation like

function incrementLikes(mediaId) {
  for (let i = 0; i < currentUserMedia.length; i++) {
    if (currentUserMedia[i].id === mediaId) {
      currentUserMedia[i].likes++;
      break;
    }
  }
  constructMediaHtml();
  constructBoxTotalHeart(currentUserDetails, totalHeart(currentUserMedia));
}

// loop for implement span filters of each photographer

const filterTags = () => {
  let filterTags = "";
  for (let i = 0; i < currentUserDetails.tags.length; i++) {
    let tag = currentUserDetails.tags[i];
    filterTags += ` 
    <a class="presentation__link" href="./index.html?filterTag=${tag}" aria-label="filter Tags"><span class="filters__profile">#${tag}</span></a>
    `;
  }
  return filterTags;
};

// increment info photographer by javascript

function constructInfoPhotographer(photographer, filterTags) {
  presentationPhotographer.innerHTML += `
  <h1 class="presentation__pro" aria-label="Title name photographer">${photographer.name}</h1>
  <p class="presentation__city" aria-label="Geolocation">${photographer.city}, ${photographer.country}</p>
  <p class="presentation__description" aria-label="Citation photographer">${photographer.tagline}</p>
  <div class="presentation__filters filters" id="btn">${filterTags}</div>
  <button class="presentation__contact" aria-label="Contact Me">Contactez-moi</button>
  <img
  class="presentation__image"
  src="img/photographersIDPhotos/${photographer.portrait}"
  alt="${photographer.name}"
  />
  `;
  const contact = document.getElementsByClassName("presentation__contact");
  console.log(contact);
  contact[0].addEventListener("click", openModal);
}

// Function count heart and price per photographer

function totalHeart(mediasList) {
  let sum = 0;
  for (let media of mediasList) {
    sum += media.likes;
  }
  return sum;
}

function constructBoxTotalHeart(photographer, totalHeart) {
  boxHeart.innerHTML = `
  <p class="icon">${totalHeart}
    <span class="fas fa-heart" aria-label="likes"></span></p>
  <p class="price">${photographer.price}€/jour</p>
  `;
}

// Factory Function (video or image)
function mediaFactory(media) {
  if (media.video) {
    return `<video controls width="310" class="photo__video">
    <source src="./img/${media.video}"
            type="video/mp4">
            role="application"
    </video>`;
  } else {
    return `
    <img
    class="photo__image"
    src="./img/${media.image}" 
    alt=""
    tabindex="0"
    />`;
  }
}

// open Modal

function openModal() {
  modal.style.display = "block";
  test.style.display = "block";
}

// close Modal

function closeModal() {
  modal.style.display = "none";
  test.style.display = "none";
}

cross.addEventListener("click", closeModal);
