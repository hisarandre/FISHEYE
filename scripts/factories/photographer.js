function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `/assets/photographers/low-res/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "image du photographe " + name);

    const photographerName = document.createElement("h2");
    photographerName.textContent = name;

    const location = document.createElement("h3");
    location.textContent = city + ", " + country;

    const tag = document.createElement("p");
    tag.textContent = tagline;

    const pricePerDay = document.createElement("span");
    pricePerDay.classList.add("price");
    pricePerDay.textContent = price + "€/jour";

    article.appendChild(img);
    article.appendChild(photographerName);
    article.appendChild(location);
    article.appendChild(tag);
    article.appendChild(pricePerDay);

    return article;
  }

  return { name, id, city, country, tagline, price, picture, getUserCardDOM };
}
