async function getIdInUrl() {
  const params = new URL(document.location).searchParams;
  return params.get("id");
}

async function getPhotographerbyId() {
  const photographerId = await getIdInUrl();
  const photographersData = await getData();
  return photographersData.find((element) => element.id == photographerId);
}

async function displayData(photographer) {
  const photographerHeader = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(photographer);
  const UserProfileDOM = photographerModel.getUserProfileDOM();
  photographerHeader.appendChild(UserProfileDOM);
}

async function init() {
  const photographer = await getPhotographerbyId();
  displayData(photographer);
}

init();
