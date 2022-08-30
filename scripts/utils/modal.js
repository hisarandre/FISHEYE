import { Api } from "../api/api.js";
import { Photographer } from "../models/photographer.js";
export class Modal {
  constructor() {
    this._modalBackground = document.getElementById("modal-background");
    this._body = document.querySelectorAll("body")[0];
    this._main = document.querySelectorAll("main")[0];
    this._closeBtn = document.querySelectorAll(".modal__close-btn")[0];
    this._formBtn = document.querySelector(".photograph-header__infos button");
    this._modalTitle = document.querySelectorAll("#modal__title")[0];
    this._modal = document.getElementsByClassName("modal")[0];
    this._modalThanks = document.getElementsByClassName("modal-thanks")[0];
    this.dataApi = new Api();
  }

  displayModal() {
    this._modalBackground.style.display = "block";
    this._modal.style.display = "block";
    this._body.style.overflow = "hidden";

    this._modalBackground.setAttribute("aria-hidden", false);
    this._closeBtn.setAttribute("tabindex", 0);
    this._closeBtn.focus();

    this._main.setAttribute("aria-hidden", "true");
  }

  closeModal() {
    this._modalBackground.style.display = "none";
    this._modalThanks.style.display = "none";
    this._body.style.overflow = "auto";

    this._closeBtn.removeAttribute("tabindex");
    this._modalBackground.setAttribute("aria-hidden", true);
    this._main.setAttribute("aria-hidden", false);
  }

  async displayPhotographerName() {
    const photographerData = await this.dataApi.getPhotographerById();
    const photographerById = new Photographer(photographerData);
    this._modalTitle.innerHTML = "Contactez-moi <br>" + photographerById.name;
  }
}
