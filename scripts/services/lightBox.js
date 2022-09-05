import { MediaGallery } from "../templates/mediaGallery.js";
import { MediaFactory } from "../factories/mediaFactory.js";

export class LightBox {
  constructor(array) {
    this._array = array;
  }

  reset() {
    const $carrouselOpened = document.querySelectorAll(".photograph-carrousel__media").length > 0;
    if ($carrouselOpened) {
      document.querySelector(".photograph-carrousel__media").remove();
    }
  }

  display(mediaId) {
    this.reset();

    document.querySelector(".wrapper-carrousel").style.display = "flex";
    document.querySelectorAll("main")[0].setAttribute("aria-hidden", "true");
    document.querySelector("body header").setAttribute("aria-hidden", "true");
    document.querySelector(".wrapper-carrousel").setAttribute("aria-hidden", "false");
    document.querySelectorAll("body")[0].style.overflow = "hidden";

    let mediaById = this._array.find((element) => element.id == mediaId);
    mediaById = new MediaFactory(mediaById);

    const Template = new MediaGallery(mediaById);
    document.querySelector(".photograph-carrousel").appendChild(Template.createMediaLightBox());

    //focus and accessibility
    document.querySelector(".wrapper-carrousel__close-btn").setAttribute("tabindex", 0);
    document.querySelector(".wrapper-carrousel__next-btn").setAttribute("tabindex", 0);
    document.querySelector(".wrapper-carrousel__previous-btn").setAttribute("tabindex", 0);
    document.querySelector(".photograph-carrousel__media").focus();

    //add controls to video
    this.addControlsToVideo(Template._media.constructor.name);
  }

  close() {
    document.querySelector(".wrapper-carrousel").style.display = "none";
    document.querySelectorAll("body")[0].style.overflow = "auto";

    document.querySelector(".wrapper-carrousel__close-btn").removeAttribute("tabindex");
    document.querySelector(".wrapper-carrousel__next-btn").removeAttribute("tabindex");
    document.querySelector(".wrapper-carrousel__previous-btn").removeAttribute("tabindex");
    document.querySelectorAll("main")[0].setAttribute("aria-hidden", "false");
    document.querySelector("body header").setAttribute("aria-hidden", "false");
    document.querySelector(".wrapper-carrousel").setAttribute("aria-hidden", "true");
  }

  next() {
    const $currentMediaLink = document.querySelector(".photograph-carrousel__media");
    const $mediaId = $currentMediaLink.getAttribute("id");

    this.reset();

    let index = this._array.findIndex((media) => media.id == $mediaId);
    let endOfArray = this._array.length - 1;

    index !== endOfArray ? index++ : (index = 0);

    //create the next media
    let nextMedia = this._array[index];
    nextMedia = new MediaFactory(nextMedia);

    const Template = new MediaGallery(nextMedia);
    document.querySelector(".photograph-carrousel").appendChild(Template.createMediaLightBox());

    //add controls to video
    this.addControlsToVideo(Template._media.constructor.name);
    document.querySelector(".photograph-carrousel__media").focus();
  }

  previous() {
    const $currentMediaLink = document.querySelector(".photograph-carrousel__media");
    const $mediaId = $currentMediaLink.getAttribute("id");

    this.reset();

    let index = this._array.findIndex((media) => media.id == $mediaId);
    let endOfArray = this._array.length - 1;

    index !== 0 ? index-- : (index = endOfArray);

    //create the previous media
    let nextMedia = this._array[index];
    nextMedia = new MediaFactory(nextMedia);

    const Template = new MediaGallery(nextMedia);
    document.querySelector(".photograph-carrousel").appendChild(Template.createMediaLightBox());

    //add controls to video
    this.addControlsToVideo(Template._media.constructor.name);
    document.querySelector(".photograph-carrousel__media").focus();
  }

  addControlsToVideo(media) {
    if (media == "Video") {
      document.querySelector(".photograph-carrousel__media .video-controls").controls = true;
    }
  }
}
