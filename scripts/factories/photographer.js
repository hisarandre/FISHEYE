function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/low-res/${portrait}`;

  function getUserCardDOM() {
    //create card (article)
    const card = document.createElement("article");
    card.classList.add("card");

    //create card user
    const cardUser = document.createElement("section");
    cardUser.setAttribute("tabindex", "0");
    cardUser.classList.add("card__user");

    const urlWithId = "./photographer.html?id=" + id;
    const url = document.createElement("a");
    url.setAttribute("href", urlWithId);

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "photos de " + name);
    img.classList.add("profile-picture");

    const userName = document.createElement("h2");
    userName.textContent = name;
    userName.classList.add("card__user--name");

    //create card details
    const cardDetails = document.createElement("section");
    cardDetails.setAttribute("tabindex", "0");
    cardDetails.classList.add("card__details");

    const location = document.createElement("h3");
    location.textContent = city + ", " + country;
    location.classList.add("card__details--location");

    const tag = document.createElement("p");
    tag.textContent = tagline;

    const pricePerDay = document.createElement("span");
    pricePerDay.textContent = price + "€/jour";
    pricePerDay.classList.add("card__details--price");

    //arborescence
    card.appendChild(url);

    url.appendChild(cardUser);
    cardUser.appendChild(img);
    cardUser.appendChild(userName);

    url.appendChild(cardDetails);
    cardDetails.appendChild(location);
    cardDetails.appendChild(tag);
    cardDetails.appendChild(pricePerDay);

    return card;
  }

  function getUserProfileDOM() {
    const photographerInfos = document.querySelector(".photograph-header__infos");

    const userName = document.createElement("h1");
    userName.textContent = name;
    userName.classList.add("photograph-header__infos--name");

    const photographerDetails = document.createElement("div");
    photographerDetails.setAttribute("tabindex", "0");

    const location = document.createElement("h3");
    location.textContent = city + ", " + country;
    location.classList.add("photograph-header__infos--location");

    const tag = document.createElement("p");
    tag.textContent = tagline;

    const photographerImg = document.querySelector(".photograph-header__picture");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "photos de " + name);
    img.classList.add("profile-picture");

    //arborescence
    photographerInfos.appendChild(userName);
    photographerInfos.appendChild(photographerDetails);
    photographerDetails.appendChild(location);
    photographerDetails.appendChild(tag);
    photographerImg.appendChild(img);

    return photographerInfo;
  }

  return { name, id, city, country, tagline, price, picture, getUserCardDOM, getUserProfileDOM };
}
