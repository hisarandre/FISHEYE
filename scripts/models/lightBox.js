class LightBox {
  constructor(mediaId, mediasData) {
    this._id = mediaId;
    this._array = mediasData;
  }

  display() {
    document.querySelector(".wrapper-carrousel").style.display = "flex";
    document.querySelectorAll("body")[0].style.overflow = "hidden";

    let mediaById = this._array.find((element) => element.id == this._id);
    mediaById = new MediaFactory(mediaById);

    const Template = new MediaGallery(mediaById);
    document.querySelector(".photograph-carrousel").appendChild(Template.createMediaLightBox());

    //add controls to video
    if (Template._media.constructor.name == "Video") {
      document.querySelector(".photograph-carrousel__media .video-controls").controls = true;
    }
  }

  close() {
    document.querySelector(".wrapper-carrousel").style.display = "none";
    document.querySelectorAll("body")[0].style.overflow = "auto";
  }

  reset() {
    const carrouselAlreadyOpened = document.querySelectorAll(".photograph-carrousel__media").length > 0;
    if (carrouselAlreadyOpened) {
      document.querySelector(".photograph-carrousel__media").remove();
    }
  }

  next() {
    let index = this._array.findIndex((media) => media.id == this._id);
    let endOfArray = this._array.length - 1;

    index !== endOfArray ? index++ : (index = 0);

    //create the nextmedia
    let nextMedia = this._array[index];
    nextMedia = new MediaFactory(nextMedia);

    const Template = new MediaGallery(nextMedia);
    document.querySelector(".photograph-carrousel").appendChild(Template.createMediaLightBox());

    //add controls to video
    if (Template._media.constructor.name == "Video") {
      document.querySelector(".photograph-carrousel__media .video-controls").controls = true;
    }
  }

  previous() {
    let index = this._array.findIndex((media) => media.id == this._id);
    let endOfArray = this._array.length - 1;

    index !== 0 ? index-- : (index = endOfArray);

    //create the nextmedia
    let nextMedia = this._array[index];
    nextMedia = new MediaFactory(nextMedia);

    const Template = new MediaGallery(nextMedia);
    document.querySelector(".photograph-carrousel").appendChild(Template.createMediaLightBox());

    //add controls to video
    if (Template._media.constructor.name == "Video") {
      document.querySelector(".photograph-carrousel__media .video-controls").controls = true;
    }
  }
}

const mediaLightbox = new LightBox();
