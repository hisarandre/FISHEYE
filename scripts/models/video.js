class Video extends Media {
  constructor(data) {
    super(data);

    this._url = data.image;
  }

  get url() {
    return `assets/galeries/${this.photographerId}/${this._url}`;
  }
}
