import { Api } from "./api/api.js";
import { MediaFactory } from "./factories/MediaFactory.js";
import { Photographer } from "./models/photographer.js";
import { UserCard } from "./templates/userCard.js";
import { UserProfile } from "./templates/userProfile.js";
import { MediaGallery } from "./templates/mediaGallery.js";
import { LikesBox } from "./templates/likesBox.js";
import { SortMedias } from "./services/sortMedias.js";
import { LightBox } from "./services/lightBox.js";
import { Likes } from "./services/likes.js";
import { Dropdown } from "./utils/dropdown.js";
import { Form } from "./utils/form.js";
import { Modal } from "./utils/modal.js";

class App {
  constructor() {
    this.photographersSection = document.querySelector(".photographer-section");
    this.photographerHeader = document.querySelector(".photograph-header");
    this.photographerGallery = document.querySelector(".photograph-gallery");
    this.body = document.querySelector("main");
    this.dataApi = new Api();
    this.lightbox = null;
  }

  async initHomePage() {
    const photographersData = await this.dataApi.getPhotographersData();

    photographersData
      .map((photographer) => new Photographer(photographer))
      .forEach((photographer) => {
        const Template = new UserCard(photographer);
        this.photographersSection.appendChild(Template.createUserCard());
      });
  }

  async displayProfile() {
    const photographerData = await this.dataApi.getPhotographerById();

    const photographerById = new Photographer(photographerData);
    const Template = new UserProfile(photographerById);
    this.photographerHeader.appendChild(Template.createUserProfile());
  }

  async sortByCategories() {
    const dorpdownListItems = document.querySelectorAll(".dropdown__list-item");
    //const dorpdownListSelected = document.querySelector("#dropdown__selected");
    var mediasData = await this.dataApi.getMediasData();
    const sortMedias = new SortMedias(mediasData);
    const dropdown = new Dropdown();

    dropdown.selectSortOption();
    dropdown.dropdownSelected.addEventListener("click", (e) => dropdown.toggleListVisibility(e));
    dropdown.dropdownSelected.addEventListener("keydown", (e) => dropdown.toggleListVisibility(e));

    dorpdownListItems.forEach((item) => {
      item.addEventListener("click", () => {
        let medias = sortMedias.byOption(item.id);
        this.displayGallery(medias);
        this.displayLikesBox();
      });
    });
  }

  async displayGallery(array) {
    var mediasData;

    if (array === undefined) {
      mediasData = await this.dataApi.getMediasData();
    } else {
      mediasData = array;
    }

    mediasData
      .map((media) => new MediaFactory(media))
      .forEach((media) => {
        const Template = new MediaGallery(media);
        this.photographerGallery.appendChild(Template.createMediaGallery());
      });

    this.displayLightBox(mediasData);
  }

  displayLightBox(array) {
    const mediasLinks = document.querySelectorAll(".card-media__link");
    const nextBtn = document.querySelector(".wrapper-carrousel__next-btn");
    const prevBtn = document.querySelector(".wrapper-carrousel__previous-btn");
    const closeBtn = document.querySelector(".wrapper-carrousel__close-btn");

    this.lightbox = new LightBox(array);

    closeBtn.addEventListener("click", () => {
      this.lightbox.close();
    });

    mediasLinks.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const mediaId = link.getAttribute("id");
        this.lightbox.display(mediaId);
      })
    );

    nextBtn.addEventListener("click", () => {
      const currentMediaLink = document.querySelector(".photograph-carrousel__media");
      const mediaId = currentMediaLink.getAttribute("id");
      this.lightbox.next(mediaId);
    });

    prevBtn.addEventListener("click", () => {
      const currentMediaLink = document.querySelector(".photograph-carrousel__media");
      const mediaId = currentMediaLink.getAttribute("id");
      this.lightbox.previous(mediaId);
    });
  }

  async displayLikesBox() {
    const photographerData = await this.dataApi.getPhotographerById();
    const photographerById = new Photographer(photographerData);
    const mediasData = await this.dataApi.getMediasData();

    //get total likes
    let likes = new Likes(mediasData);
    let totalLikes = likes.getAllLikes();
    //get all media liked
    likes.getMediaLiked(totalLikes);

    //create likesbox
    const Template = new LikesBox(totalLikes, photographerById.price);
    this.body.appendChild(Template.createLikesBox());
  }

  displayForm() {
    const contactModal = new Modal();
    const contactForm = new Form();
    const btnsClose = document.querySelectorAll(".modal__close-btn");
    const btnContact = document.querySelector(".photograph-header .btn");
    const btnThanksClose = document.querySelector(".modal-thanks .btn");

    btnContact.addEventListener("click", (e) => {
      e.preventDefault();
      contactModal.displayModal();
      contactModal.displayPhotographerName();
    });

    btnsClose.forEach((btn) => {
      btn.addEventListener("click", () => {
        contactModal.closeModal();
      });
    });

    btnThanksClose.addEventListener("click", () => {
      contactModal.closeModal();
    });

    contactForm._form.addEventListener("submit", contactForm.submitForm);
  }

  initGallery() {
    this.displayProfile();
    this.sortByCategories();
    this.displayGallery();
    this.displayLikesBox();
    this.displayForm();
  }
}

const app = new App();
var indexPage = window.location.href.includes("index");

if (indexPage) {
  app.initHomePage();
} else if (!indexPage) {
  app.initGallery();
}
