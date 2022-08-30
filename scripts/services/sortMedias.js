export class SortMedias {
  constructor(array) {
    this._array = array;
    this.photographerGallery = document.querySelector(".photograph-gallery");
  }

  byOption(selectedOption) {
    this.reset();

    switch (selectedOption) {
      case "option-1":
        return this._array.sort((a, b) => b.likes - a.likes);
      case "option-2":
        return this._array.sort((a, b) => a.date.localeCompare(b.date));

      case "option-3":
        return this._array.sort((a, b) => a.title.localeCompare(b.title));

      default:
        break;
    }
  }

  reset() {
    document.querySelectorAll(".card-media").forEach((e) => e.remove());
    document.querySelector(".likes-box").remove();
  }
}
