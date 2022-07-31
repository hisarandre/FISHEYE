// GET JSON DATA AND RETURN PHOTOGRAPHERS ARRAYS
async function getAllPhotographers() {
  const photographers = await getData();
  return { photographers };
}

// DISPLAY DATA ON THE PHOTOGRAPHERS SECTION
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer-section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getAllPhotographers();
  displayData(photographers);
}

init();
