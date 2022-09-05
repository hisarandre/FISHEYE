import { Api } from "../api/api.js";
import { Photographer } from "../models/photographer.js";
export class Modal {
  constructor() {
    this._body = document.querySelectorAll("body")[0];
    this._main = document.querySelectorAll("main")[0];
    this._header = document.querySelector("body header");

    this._closeBtn = document.querySelectorAll(".modal__close-btn");
    this._formBtn = document.querySelector(".photograph-header button");
    this._submitBtn = document.querySelector(".contact-form button");
    this._closeThanksBtn = document.querySelector(".modal-thanks .btn");

    this._modalTitle = document.querySelectorAll("#modal__title")[0];
    this._modal = document.getElementsByClassName("modal")[0];
    this._modalBackground = document.getElementById("modal-background");
    this._modalThanks = document.getElementsByClassName("modal-thanks")[0];

    this._focusableElements = "header h1, header .modal__close-btn, form .form-data input, form .form-data textarea, form button";

    this.dataApi = new Api();
  }

  displayModal() {
    this._modalBackground.style.display = "block";
    this._modal.style.display = "block";
    this._body.style.overflow = "hidden";

    this._modalBackground.setAttribute("aria-hidden", false);
    this._main.setAttribute("aria-hidden", "true");
    this._header.setAttribute("aria-hidden", "true");
    this._closeBtn[0].setAttribute("tabindex", 0);
    this._closeBtn[0].focus();
  }

  closeModal() {
    this._modalBackground.style.display = "none";
    this._modalThanks.style.display = "none";
    this._body.style.overflow = "auto";

    this._closeBtn[0].removeAttribute("tabindex");
    this._modalBackground.setAttribute("aria-hidden", true);
    this._main.setAttribute("aria-hidden", false);
    this._header.setAttribute("aria-hidden", false);
    this._formBtn.focus();
  }

  async displayPhotographerName() {
    const photographerData = await this.dataApi.getPhotographerById();
    const photographerById = new Photographer(photographerData);
    this._modalTitle.innerHTML = "Contactez-moi <br>" + photographerById.name;
  }

  focusControl(e) {
    const $focusableContent = this._modal.querySelectorAll(this._focusableElements);
    let index = Array.from($focusableContent).indexOf(document.activeElement);
    let lastIndex = $focusableContent.length;
    let newIndex;

    if (e.key === "Tab") {
      if (document.activeElement == this._submitBtn) {
        e.preventDefault();
        this._closeBtn[0].focus();
      }
    }

    if (e.key === "ArrowDown") {
      newIndex = index + 1;

      if (newIndex == lastIndex) {
        this._closeBtn[0].focus();
      } else {
        $focusableContent[newIndex].focus();
      }
    }

    if (e.key === "ArrowUp") {
      newIndex = index - 1;

      if (newIndex == 0) {
        this._submitBtn.focus();
      } else {
        $focusableContent[newIndex].focus();
      }
    }
  }
}
