import { Api } from "../api/api.js";
import { Photographer } from "../models/photographer.js";
export class Modal {
  constructor() {
    this.$body = document.querySelectorAll("body")[0];
    this.$main = document.querySelectorAll("main")[0];
    this.$header = document.querySelector("body header");

    this.$closeBtn = document.querySelectorAll(".modal__close-btn");
    this.$formBtn = document.querySelector(".photograph-header button");
    this.$submitBtn = document.querySelector(".contact-form button");
    this.$closeThanksBtn = document.querySelector(".modal-thanks .btn");

    this.$modalTitle = document.querySelectorAll("#modal__title")[0];
    this.$modal = document.getElementsByClassName("modal")[0];
    this.$modalBackground = document.getElementById("modal-background");
    this.$modalThanks = document.getElementsByClassName("modal-thanks")[0];

    this.focusableElements = "header h1, header .modal__close-btn, form .form-data input, form .form-data textarea, form button";

    this._dataApi = new Api();
  }

  displayModal() {
    this.$modalBackground.style.display = "block";
    this.$modal.style.display = "block";
    this.$body.style.overflow = "hidden";

    this.$modalBackground.setAttribute("aria-hidden", false);
    this.$main.setAttribute("aria-hidden", "true");
    this.$header.setAttribute("aria-hidden", "true");
    this.$closeBtn[0].setAttribute("tabindex", 0);
    this.$closeBtn[0].focus();
  }

  closeModal() {
    this.$modalBackground.style.display = "none";
    this.$modalThanks.style.display = "none";
    this.$body.style.overflow = "auto";

    this.$closeBtn[0].removeAttribute("tabindex");
    this.$modalBackground.setAttribute("aria-hidden", true);
    this.$main.setAttribute("aria-hidden", false);
    this.$header.setAttribute("aria-hidden", false);
    this.$formBtn.focus();
  }

  async displayPhotographerName() {
    const photographerData = await this._dataApi.getPhotographerById();
    const photographerById = new Photographer(photographerData);
    this.$modalTitle.innerHTML = "Contactez-moi <br>" + photographerById.name;
  }

  focusControl(e) {
    const $focusableContent = this.$modal.querySelectorAll(this.focusableElements);
    let index = Array.from($focusableContent).indexOf(document.activeElement);
    let lastIndex = $focusableContent.length;
    let newIndex;

    if (e.key === "Tab") {
      if (document.activeElement == this.$submitBtn) {
        e.preventDefault();
        this.$closeBtn[0].focus();
      }
    }

    if (e.key === "ArrowDown") {
      newIndex = index + 1;

      if (newIndex == lastIndex) {
        this.$closeBtn[0].focus();
      } else {
        $focusableContent[newIndex].focus();
      }
    }

    if (e.key === "ArrowUp") {
      newIndex = index - 1;

      if (newIndex == 0) {
        this.$submitBtn.focus();
      } else {
        $focusableContent[newIndex].focus();
      }
    }
  }
}
