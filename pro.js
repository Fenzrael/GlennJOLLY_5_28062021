const params = new URLSearchParams(document.location.search.substring(1));

const photographerId = params.get("photographerId");

const likeButton = document.getElementsByClassName("legend__icon");
const likeCount = document.getElementsByClassName("legend__likes");

const gallery = document.getElementById("gallery");
const presentationPhotographer = document.getElementById("presentation");

const pathToImgDirectory = "./img/";

// Variable pouvant stocker le photographe en cours

/* const currentPhotographer = {
  name: "Mimi Keel",
  id: 243,
  city: "London",
  country: "UK",
  tags: ["portrait", "events", "travel", "animals"],
  tagline: "Voir le beau dans le quotidien",
  price: 400,
  portrait: "MimiKeel.jpg",
};
 */

// Import données data.json
let userData = [];

const userMedia = async () => {
  await fetch("./data.json")
    .then((res) => res.json())
    .then((data) => (userData = data));

  console.log(userData);
};

// Import media Photographers
const currentUserMedia = [];
// Import photographers details
const currentUserDetails = [];

const userDisplay = async () => {
  await userMedia();

  userData.media.forEach((media) => {
    if (media.photographerId == photographerId) {
      currentUserMedia.push(media);
    }
  });
  //tri par defaut
  currentUserMedia.sort(function (a, b) {
    return b.likes - a.likes;
  });

  userData.photographers.forEach((photographer) => {
    if (photographer.id == photographerId) {
      currentUserDetails.push(photographer);
    }
  });
  constructMediaHtml();
  constructInfoPhotographer();
};

userDisplay();

function constructMediaHtml() {
  gallery.innerHTML = ""; // rerender(rerendre le contenu (reorganisation donnees))
  currentUserMedia.forEach((media) => {
    gallery.innerHTML += `
    <figure class="gallery__photo photo"> 
    <img
      class="photo__image"
      src="./img/${media.image}" 
      alt="${media.title}"
    />
    <figcaption class="legend">
      ${media.title}<span class="legend__likes">${media.likes}</span
      ><span class="fas fa-heart legend__icon" onclick="incrementLikes(${media.id})"></span>
    </figcaption>
  </figure>`;
  });
}

// Implementation tri

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
}

// incrementation info photographe par javascript

function constructInfoPhotographer() {
  currentUserMedia.forEach((photographer) => {
    presentationPhotographer.innerHTML += `
    
  <h1 class="presentation__pro">${photographer.name}</h1>
  <p class="presentation__city">${photographer.city}, ${photographer.country}</p>
  <p class="presentation__description">${photographer.tagline}</p>
  <div class="presentation__filters filters"></div>
  <button class="presentation__contact">Contactez-moi</button>
  <img
    class="presentation__image"
    src="img/photographersIDPhotos/${photographer.portrait}"
    alt="${photographer.name}"
  />
    `;
  });
}
constructInfoPhotographer();
// boucle pour implementer les span des filtres de chaque photographes
/* for (let i = 0; i < currentUserDetails.length; i++) {} */
