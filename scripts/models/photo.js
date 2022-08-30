import { Media } from "./media.js";
export class Photo extends Media {
  constructor(data) {
    super(data);

    this._url = data.image;
  }

  get url() {
    return `<img src="assets/galeries/${this.photographerId}/optimized/${this._url}" alt="${this._title}">`;
  }
}
