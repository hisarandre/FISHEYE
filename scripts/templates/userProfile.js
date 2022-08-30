export class UserProfile {
  constructor(data) {
    this._photographer = data;
  }

  createUserProfile() {
    const $photographerInfos = document.querySelector(".photograph-header__infos");

    //create name
    const $userName = document.createElement("h1");
    $userName.textContent = this._photographer.name;
    $userName.classList.add("photograph-header__infos--name");
    $userName.setAttribute("tabindex", "0");

    const $photographerDetails = document.createElement("div");
    $photographerDetails.setAttribute("tabindex", "0");

    //create location city + country
    const $location = document.createElement("h2");
    $location.textContent = `${this._photographer.city}, ${this._photographer.country}`;
    $location.classList.add("photograph-header__infos--location");

    //create tagline
    const $tag = document.createElement("p");
    $tag.textContent = this._photographer.tagline;

    const $photographerImg = document.createElement("div");
    $photographerImg.classList.add("photograph-header__picture");

    //create img
    const $img = document.createElement("img");
    $img.setAttribute("src", `${this._photographer.portrait}`);
    $img.setAttribute("alt", " ");
    $img.classList.add("profile-picture");

    //arborescence
    $photographerInfos.appendChild($userName);
    $photographerInfos.appendChild($photographerDetails);
    $photographerDetails.appendChild($location);
    $photographerDetails.appendChild($tag);
    $photographerImg.appendChild($img);

    return $userName, $photographerDetails, $location, $tag, $img, $photographerImg;
  }
}
