class MediaGallery {
  constructor(data) {
    this._media = data;
  }
  createMediaGallery() {
    const card = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", `${this._media.url}`);

    //arborescence
    card.appendChild(img);
    console.log(this._media);
    return card;
  }
}
