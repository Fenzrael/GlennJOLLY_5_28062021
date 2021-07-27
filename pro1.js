const gallery = document.getElementById("gallery");
const pathToImgDirectory = "./img/";
const currentPhotographer = {
  name: "Mimi Keel",
  id: 243,
  city: "London",
  country: "UK",
  tags: ["portrait", "events", "travel", "animals"],
  tagline: "Voir le beau dans le quotidien",
  price: 400,
  portrait: "MimiKeel.jpg",
};
let userData = [];

const currentUserMedia = [];
const userMedia = async () => {
  await fetch("data.json")
    .then((res) => res.json())
    .then((data) => (userData = data));

  console.log(userData);
};

const userDisplay = async () => {
  await userMedia();

  userData.media.forEach((media) => {
    if (media.photographerId == currentPhotographer.id) {
      currentUserMedia.push(media);
      gallery.innerHTML += `
        <figure class="gallery__photo photo"> 
        <img
          class="photo__image"
          src="./img/${media.image}" 
          alt=""
        />
        <figcaption class="legend">
          ${media.title}<span class="legend__likes">${media.likes}</span
          ><span class="fas fa-heart legend__icon"></span>
        </figcaption>
      </figure>`;
    }
  });
};

userDisplay();
