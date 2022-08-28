class SortMedias {
  constructor(array) {
    this._array = array;
    this.photographerGallery = document.querySelector(".photograph-gallery");
  }

  byOption(selectedOption) {
    switch (selectedOption) {
      case "option-1":
        const mediasByLikes = this._array.sort((a, b) => b.likes - a.likes);
        this.displayGallery(mediasByLikes);
        break;

      case "option-2":
        const mediasByDate = this._array.sort((a, b) => a.date.localeCompare(b.date));
        this.displayGallery(mediasByDate);
        break;

      case "option-3":
        const mediasByTitle = this._array.sort((a, b) => a.title.localeCompare(b.title));
        this.displayGallery(mediasByTitle);
        break;

      default:
        break;
    }
  }

  reset() {
    var oldGallery = document.querySelector(".photograph-gallery");
    document.querySelectorAll(".card-media").forEach((e) => e.remove());

    // while (oldGallery.firstChild) {
    //   oldGallery.removeChild(oldGallery.firstChild);
    // }
    // document.querySelector(".likes-box").remove();
  }

  displayGallery(newArray) {
    this.reset();

    newArray
      .map((media) => new MediaFactory(media))
      .forEach((media) => {
        const Template = new MediaGallery(media);
        this.photographerGallery.appendChild(Template.createMediaGallery());
      });

    const init = new App();
    //init.displayLightBox();
    init.displayLikesBox();
  }
}
