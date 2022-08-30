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

    $url.innerHTML = this._media.url;

    const $infos = document.createElement("div");
    $infos.classList.add("card-media__infos");

    const $title = document.createElement("h4");
    $title.textContent = this._media.title;
    $title.classList.add("card-media__infos--title");

    const $likes = document.createElement("div");
    $likes.classList.add("card-media__infos--likes");

    const $nbrLikes = document.createElement("p");
    $nbrLikes.textContent = this._media.likes;

    const $btnlikes = document.createElement("button");
    $btnlikes.classList.add("fa-solid");
    $btnlikes.classList.add("fa-heart");
    $btnlikes.setAttribute("aria-label", "likes");

    //arborescence
    $card.appendChild($url);

    $card.appendChild($infos);
    $infos.appendChild($title);
    $infos.appendChild($likes);
    $likes.appendChild($nbrLikes);
    $likes.appendChild($btnlikes);

    return $card;
  }

  createMediaLightBox() {
    const $wrapperCarrousel = document.querySelector(".wrapper-carrousel");
    $wrapperCarrousel.style.display = "flex";

    const $carrousel = document.createElement("li");
    $carrousel.classList.add("photograph-carrousel__media");
    $carrousel.setAttribute("id", this._media.id);
    $carrousel.innerHTML = this._media.url;

    const $title = document.createElement("h2");
    $title.textContent = this._media.title;
    $title.classList.add("photograph-carrousel__title");

    //arborescence
    $carrousel.appendChild($title);

    return $wrapperCarrousel, $carrousel;
  }
}
