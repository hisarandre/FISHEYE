class LikesBox {
  constructor(likes, price) {
    this._likes = likes;
    this._price = price;
  }

  createLikesBox() {
    const $box = document.createElement("aside");
    $box.classList.add("likes-box");

    const $likes = document.createElement("span");
    $likes.classList.add("likes-box__likes");
    $likes.innerHTML = this._likes;

    const $price = document.createElement("span");
    $price.classList.add("likes-box__price");
    $price.innerHTML = this._price;

    //arborescence
    $box.appendChild($likes);
    $box.appendChild($price);

    return $box;
  }
}
