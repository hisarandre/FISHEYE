import { Api } from "./api/api.js";
import { MediaFactory } from "./factories/mediaFactory.js";
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
    this.contactModal = new Modal();
    this.contactForm = new Form();
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
    var mediasData = await this.dataApi.getMediasData();
    const sortMedias = new SortMedias(mediasData);
    const dropdown = new Dropdown();

    dropdown.selectSortOption();
    dropdown.dropdownSelected.addEventListener("click", (e) => dropdown.toggleListVisibility(e));
    dropdown.dropdownSelected.addEventListener("keydown", (e) => dropdown.toggleListVisibility(e));

    dropdown.dorpdownListItems.forEach((item) => {
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
    const closeBtn = document.querySelector(".wrapper-carrousel__close-btn");

    this.lightbox = new LightBox(array);

    closeBtn.addEventListener("click", () => {
      this.lightbox.close();
    });

    closeBtn.addEventListener("keypress", (e) => {
      if (e.key == "Enter") {
        this.lightbox.close();
        document.querySelector(".card-media__link").focus();
      }
    });

    mediasLinks.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const mediaId = link.getAttribute("id");
        this.lightbox.display(mediaId);
      })
    );
  }

  lightboxControls() {
    const nextBtn = document.querySelector(".wrapper-carrousel__next-btn");
    const prevBtn = document.querySelector(".wrapper-carrousel__previous-btn");
    const carrousel = document.querySelector(".wrapper-carrousel");
    const media = document.querySelector(".photograph-carrousel__media");

    document.addEventListener("keydown", (e) => {
      if (carrousel.getAttribute("aria-hidden") == "false") {
        if (e.key === "ArrowLeft") {
          this.lightbox.previous();
        }

        if (e.key === "ArrowRight") {
          this.lightbox.next();
        }

        if (e.key === "Escape") {
          this.lightbox.close();
        }

        if (e.key === "ArrowUp") {
          document.querySelector(".wrapper-carrousel__close-btn").focus();
        }

        if (e.key === "ArrowDown") {
          document.querySelector(".photograph-carrousel__media").focus();
        }

        if (e.key === "Tab") {
          if (document.activeElement == document.querySelector(".photograph-carrousel__media")) {
            e.preventDefault();
            document.querySelector(".wrapper-carrousel__close-btn").focus();
          }
        }
      }
    });

    nextBtn.addEventListener("click", () => {
      this.lightbox.next();
    });

    prevBtn.addEventListener("click", () => {
      this.lightbox.previous();
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
    const btnContact = document.querySelector(".photograph-header .btn");

    btnContact.addEventListener("click", (e) => {
      e.preventDefault();
      this.contactModal.displayModal();
      this.contactModal.displayPhotographerName();
    });

    this.contactModal._closeBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.contactModal.closeModal();
      });

      btn.addEventListener("keypress", (e) => {
        if (e.key == "Enter") {
          this.contactModal.closeModal();
        }
      });
    });

    this.contactModal._closeThanksBtn.addEventListener("click", () => {
      this.contactModal.closeModal();
    });

    const focusableContent = this.contactModal._modal.querySelectorAll(this.contactModal._focusableElements);
    focusableContent.forEach((element) => {
      element.addEventListener("keydown", (e) => this.contactModal.focusControl(e));
    });

    this.contactForm._form.addEventListener("submit", this.contactForm.submitForm);
    document.getElementsByClassName("modal-thanks")[0].addEventListener("keydown", (e) => this.contactForm.focusControl(e));
  }

  initGallery() {
    this.displayProfile();
    this.sortByCategories();
    this.displayGallery();
    this.displayLikesBox();
    this.lightboxControls();
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
