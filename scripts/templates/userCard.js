class UserCard {
  constructor(data) {
    this._photographer = data;
  }

  createUserCard() {
    //create card (article)
    const $card = document.createElement("article");
    $card.classList.add("card");

    //create card user
    const $cardUser = document.createElement("section");
    $cardUser.setAttribute("tabindex", "0");
    $cardUser.classList.add("card__user");

    const $urlWithId = `./photographer.html?id=${this._photographer.id}`;
    const $url = document.createElement("a");
    $url.setAttribute("href", $urlWithId);

    const $img = document.createElement("img");
    $img.setAttribute("src", `${this._photographer.portrait}`);
    $img.setAttribute("alt", `photos de ${this._photographer.name}`);
    $img.classList.add("profile-picture");

    const $userName = document.createElement("h2");
    $userName.textContent = this._photographer.name;
    $userName.classList.add("card__user--name");

    //create card details
    const $cardDetails = document.createElement("section");
    $cardDetails.setAttribute("tabindex", "0");
    $cardDetails.classList.add("card__details");

    const $location = document.createElement("h3");
    $location.textContent = `${this._photographer.city}, ${this._photographer.country}`;
    $location.classList.add("card__details--location");

    const $tag = document.createElement("p");
    $tag.textContent = this._photographer.tagline;

    const $pricePerDay = document.createElement("span");
    $pricePerDay.textContent = this._photographer.price;
    $pricePerDay.classList.add("card__details--price");

    //arborescence
    $card.appendChild($url);

    $url.appendChild($cardUser);
    $cardUser.appendChild($img);
    $cardUser.appendChild($userName);

    $url.appendChild($cardDetails);
    $cardDetails.appendChild($location);
    $cardDetails.appendChild($tag);
    $cardDetails.appendChild($pricePerDay);

    return $card;
  }
}
