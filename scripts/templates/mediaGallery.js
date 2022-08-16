class MediaGallery {
  constructor(data) {
    this._media = data;
  }
  createMediaGallery() {
    const $card = document.createElement("article");
    $card.classList.add("card-media");

    const $urlWithId = `index.html`;
    const $url = document.createElement("a");
    $url.setAttribute("href", $urlWithId);

    const $media = document.createElement("div");
    $media.innerHTML = this._media.url;

    const $infos = document.createElement("div");
    $infos.classList.add("card-media__infos");

    const $title = document.createElement("h2");
    $title.textContent = this._media.title;
    $title.classList.add("card-media__infos--title");

    const $likes = document.createElement("div");
    $likes.textContent = this._media.likes;
    $likes.classList.add("card-media__infos--likes");

    //arborescence
    $card.appendChild($url);
    $url.appendChild($media);

    $card.appendChild($infos);
    $infos.appendChild($title);
    $infos.appendChild($likes);

    return $card;
  }
}
