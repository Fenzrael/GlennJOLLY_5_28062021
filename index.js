const gallery = document.getElementById("gallery");
let userData = [];

const userMedia = async () => {
  await fetch("data.json")
    .then((res) => res.json())
    .then((data) => (userData = data));

  console.log(userData);
};

const userDisplay = async () => {
  await userMedia();

  gallery.innerHTML = userData.media.map(
    (user) =>
      ` 
      
      `
  );
};

userDisplay();
