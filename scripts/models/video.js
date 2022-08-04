class Video extends Media {
  constructor(data) {
    super(data);

    this._url = data.video;
  }

  get url() {
    return `<video controls>
    <source src="assets/galeries/${this.photographerId}/${this._url}" type="video/mp4">
    Your browser does not support the video tag.
    </video>`;
  }
}
