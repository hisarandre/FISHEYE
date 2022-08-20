class Modal {
  constructor() {
    this._modalBackground = document.getElementById("modal-background");
    this._body = document.querySelectorAll("body")[0];
    this._modalTitle = document.querySelectorAll(".modal__title")[0];
    this._modal = document.getElementsByClassName("modal")[0];
    this._modalThanks = document.getElementsByClassName("modal-thanks")[0];
    this.dataApi = new Api();
  }

  displayModal() {
    this._modalBackground.style.display = "block";
    this._modal.style.display = "block";
    this._body.style.overflow = "hidden";
  }

  closeModal() {
    this._modalBackground.style.display = "none";
    this._modalThanks.style.display = "none";
    this._body.style.overflow = "auto";
  }

  async displayPhotographerName() {
    const photographerData = await this.dataApi.getPhotographerById();
    const photographerById = new Photographer(photographerData);
    this._modalTitle.innerHTML = "Contactez-moi <br>" + photographerById.name;
  }
}

const contactModal = new Modal();
contactModal.displayPhotographerName();
