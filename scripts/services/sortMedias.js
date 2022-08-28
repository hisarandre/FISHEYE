class SortMedias {
  constructor(array) {
    this._array = array;
    this.photographerGallery = document.querySelector(".photograph-gallery");
  }

  byOption(selectedOption) {
    this.reset();
    const init = new App();

    switch (selectedOption) {
      case "option-1":
        const mediasByLikes = this._array.sort((a, b) => b.likes - a.likes);
        init.displayGallery(mediasByLikes);
        init.displayLikesBox();

        break;

      case "option-2":
        const mediasByDate = this._array.sort((a, b) => a.date.localeCompare(b.date));
        init.displayGallery(mediasByDate);
        init.displayLikesBox();

        break;

      case "option-3":
        const mediasByTitle = this._array.sort((a, b) => a.title.localeCompare(b.title));
        init.displayGallery(mediasByTitle);
        init.displayLikesBox();

        break;

      default:
        break;
    }
  }

  reset() {
    document.querySelectorAll(".card-media").forEach((e) => e.remove());
    document.querySelector(".likes-box").remove();
  }
}
