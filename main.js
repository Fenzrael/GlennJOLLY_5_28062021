// Javascript page accueil
const params = new URLSearchParams(document.location.search.substring(1));
const sectionPhotographer = document.getElementById("photograph");
const navigation = document.getElementsByClassName("navigation__filters");
const filterTag = params.get("filterTag");
// Import données data.json

function getPhotographers() {
  return fetch("./data.json")
    .then((res) => res.json())
    .then((data) => data.photographers);
}
if (filterTag) {
  filterByTag(filterTag);
} else {
  getPhotographers().then((photographers) => {
    for (let i = 0; i < photographers.length; i++) {
      let photographer = photographers[i];
      constructPhotographerHtml(photographer);
    }
  });
}

function constructPhotographerHtml(photographer) {
  sectionPhotographer.innerHTML += `
  
  <article class="photograph__profile profile">
  <a
    class="profile__link link"
    href="./proDetails.html?photographerId=${photographer.id}"
  >
    <img class="link__image" src="img/photographersIDPhotos/${
      photographer.portrait
    }" alt="${photographer.name}" />
    <h1 class="link__title">${photographer.name}</h1>
  </a>
  <div class="profile__describe describe">
    <p class="describe__location">${photographer.city}, ${
    photographer.country
  }</p>
    <p class="describe__quote">${photographer.tagline}</p>
    <p class="describe__price">${photographer.price}€/jour</p>
  </div>
  <div class="profile__filters filters">${constructFilterTags(
    photographer.tags
  )}</div>
</article>
  `;
}

function constructFilterTags(tags) {
  let filterTags = "";
  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i];
    filterTags += ` 
      <span class="filters__profile" onclick="filterByTag('${tag}')">#${tag}</span>
    `;
  }
  return filterTags;
}

function filterByTag(tagName) {
  getPhotographers()
    .then((photographers) => {
      return photographers.filter((photographer) => {
        return photographer.tags.includes(tagName);
      });
    })
    .then((photographers) => {
      sectionPhotographer.innerHTML = "";
      for (let i = 0; i < photographers.length; i++) {
        let photographer = photographers[i];
        constructPhotographerHtml(photographer);
      }
    });
}
