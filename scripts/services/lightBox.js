import { MediaGallery } from "../templates/mediaGallery.js";
import { MediaFactory } from "../factories/MediaFactory.js";

export class LightBox {
  constructor(array) {
    this._array = array;
  }

  reset() {
    const carrouselAlreadyOpened = document.querySelectorAll(".photograph-carrousel__media").length > 0;
    if (carrouselAlreadyOpened) {
      document.querySelector(".photograph-carrousel__media").remove();
    }
  }

  display(mediaId) {
    this.reset();

    document.querySelector(".wrapper-carrousel").style.display = "flex";
    document.querySelectorAll("body")[0].style.overflow = "hidden";

    let mediaById = this._array.find((element) => element.id == mediaId);
    mediaById = new MediaFactory(mediaById);

    const Template = new MediaGallery(mediaById);
    document.querySelector(".photograph-carrousel").appendChild(Template.createMediaLightBox());

    //add controls to video
    this.addControlsToVideo(Template._media.constructor.name);
  }

  close() {
    document.querySelector(".wrapper-carrousel").style.display = "none";
    document.querySelectorAll("body")[0].style.overflow = "auto";
  }

  next(mediaId) {
    this.reset();
    console.log(this._array);
    console.log(mediaId);
    let index = this._array.findIndex((media) => media.id == mediaId);
    let endOfArray = this._array.length - 1;

    index !== endOfArray ? index++ : (index = 0);

    //create the next media
    let nextMedia = this._array[index];
    nextMedia = new MediaFactory(nextMedia);

    const Template = new MediaGallery(nextMedia);
    document.querySelector(".photograph-carrousel").appendChild(Template.createMediaLightBox());

    //add controls to video
    this.addControlsToVideo(Template._media.constructor.name);
  }

  previous(mediaId) {
    this.reset();

    let index = this._array.findIndex((media) => media.id == mediaId);
    let endOfArray = this._array.length - 1;

    index !== 0 ? index-- : (index = endOfArray);

    //create the previous media
    let nextMedia = this._array[index];
    nextMedia = new MediaFactory(nextMedia);

    const Template = new MediaGallery(nextMedia);
    document.querySelector(".photograph-carrousel").appendChild(Template.createMediaLightBox());

    //add controls to video
    this.addControlsToVideo(Template._media.constructor.name);
  }

  addControlsToVideo(media) {
    if (media == "Video") {
      document.querySelector(".photograph-carrousel__media .video-controls").controls = true;
    }
  }
}

const mediaLightbox = new LightBox();
