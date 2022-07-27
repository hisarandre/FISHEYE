async function getPhotographers() {
  //recupere le résultat du json
  const photographers = await getData();
  // et bien retourner le tableau photographers seulement une fois
  return photographers;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer-section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers(); // Pourquoi {photographers}
  displayData(photographers);
}

init();
