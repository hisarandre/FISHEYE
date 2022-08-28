class LightBox {
  constructor() {}

  init(mediasData) {
    const mediasLinks = document.querySelectorAll(".card-media__link");
    const nextBtn = document.querySelector(".wrapper-carrousel__next-btn");
    const prevBtn = document.querySelector(".wrapper-carrousel__previous-btn");

    mediasLinks.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const mediaId = link.getAttribute("id");
        this.display(mediaId, mediasData);
      })
    );

    nextBtn.addEventListener("click", () => {
      const currentMediaLink = document.querySelector(".photograph-carrousel__media");
      const mediaId = currentMediaLink.getAttribute("id");
      this.next(mediaId, mediasData);
    });

    prevBtn.addEventListener("click", () => {
      const currentMediaLink = document.querySelector(".photograph-carrousel__media");
      const mediaId = currentMediaLink.getAttribute("id");
      this.previous(mediaId, mediasData);
    });
  }

  reset() {
    const carrouselAlreadyOpened = document.querySelectorAll(".photograph-carrousel__media").length > 0;
    if (carrouselAlreadyOpened) {
      document.querySelector(".photograph-carrousel__media").remove();
    }
  }

  display(mediaId, mediasData) {
    this.reset();

    document.querySelector(".wrapper-carrousel").style.display = "flex";
    document.querySelectorAll("body")[0].style.overflow = "hidden";

    let mediaById = mediasData.find((element) => element.id == mediaId);
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

  next(mediaId, mediasData) {
    this.reset();

    let index = mediasData.findIndex((media) => media.id == mediaId);
    let endOfArray = mediasData.length - 1;

    index !== endOfArray ? index++ : (index = 0);

    //create the next media
    let nextMedia = mediasData[index];
    nextMedia = new MediaFactory(nextMedia);

    const Template = new MediaGallery(nextMedia);
    document.querySelector(".photograph-carrousel").appendChild(Template.createMediaLightBox());

    //add controls to video
    this.addControlsToVideo(Template._media.constructor.name);
  }

  previous(mediaId, mediasData) {
    this.reset();

    let index = mediasData.findIndex((media) => media.id == mediaId);
    let endOfArray = mediasData.length - 1;

    index !== 0 ? index-- : (index = endOfArray);

    //create the previous media
    let nextMedia = mediasData[index];
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
