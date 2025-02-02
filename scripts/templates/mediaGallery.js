export class MediaGallery {
  constructor(data) {
    this._media = data;
  }

  createMediaGallery() {
    const $card = document.createElement("article");
    $card.classList.add("card-media");

    const $urlHref = "#";
    const $url = document.createElement("a");
    $url.classList.add("card-media__link");
    $url.setAttribute("href", $urlHref);
    $url.setAttribute("id", this._media.id);
    $url.setAttribute("title", `${this._media.title}, closeup view`);
    $url.setAttribute("tabindex", 0);

    $url.innerHTML = this._media.url;

    const $infos = document.createElement("div");
    $infos.classList.add("card-media__infos");

    const $title = document.createElement("h4");
    $title.textContent = this._media.title;
    $title.classList.add("card-media__infos--title");

    const $likes = document.createElement("button");
    $likes.classList.add("card-media__infos--likes");
    $likes.setAttribute("aria-label", "likes");
    $likes.textContent = this._media.likes;

    //arborescence
    $card.appendChild($url);

    $card.appendChild($infos);
    $infos.appendChild($title);
    $infos.appendChild($likes);

    return $card;
  }

  createMediaLightBox() {
    const $wrapperCarrousel = document.querySelector(".wrapper-carrousel");
    $wrapperCarrousel.style.display = "flex";

    const $carrousel = document.createElement("li");
    $carrousel.classList.add("photograph-carrousel__media");
    $carrousel.setAttribute("id", this._media.id);
    $carrousel.innerHTML = this._media.url;
    $carrousel.setAttribute("tabindex", 0);

    const $title = document.createElement("h2");
    $title.textContent = this._media.title;
    $title.classList.add("photograph-carrousel__title");

    //arborescence
    $carrousel.appendChild($title);

    return $wrapperCarrousel, $carrousel;
  }
}
