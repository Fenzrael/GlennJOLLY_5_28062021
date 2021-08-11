const params = new URLSearchParams(document.location.search.substring(1));

const photographerId = params.get("photographerId");
const likeButton = document.getElementsByClassName("legend__icon");
const likeCount = document.getElementsByClassName("legend__likes");

const gallery = document.getElementById("gallery");
const pathToImgDirectory = "./img/";
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

// Import media Photographes
const currentUserMedia = [];

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
  constructMediaHtml();
};
console.log(currentUserMedia);
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

console.log(likeButton);

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

function constructInfoPhotographer() {}
