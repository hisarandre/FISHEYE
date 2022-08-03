class App {
  constructor() {
    this.photographersSection = document.querySelector(".photographer-section");
    this.photographerHeader = document.querySelector(".photograph-header");
    this.photographerGallery = document.querySelector(".photograph-gallery");
    this.dataApi = new Api();
  }

  async displayPhotographers() {
    const photographersData = await this.dataApi.getPhotographersData();

    photographersData
      .map((photographer) => new PhotographerFactory(photographer, "photographers"))
      .forEach((photographer) => {
        const Template = new UserCard(photographer);
        this.photographersSection.appendChild(Template.createUserCard());
      });
  }

  async displayProfile() {
    const idInUrl = new URL(document.location).searchParams.get("id");
    const photograperData = await this.dataApi.getPhotograperById(idInUrl);

    const photograperById = new PhotographerFactory(photograperData, "photographerById");
    const Template = new UserProfile(photograperById);
    this.photographerHeader.appendChild(Template.createUserProfile());
  }

  async displayGallery() {
    const idInUrl = new URL(document.location).searchParams.get("id");
    const mediasData = await this.dataApi.getMediasData(idInUrl);

    mediasData
      .map((media) => new PhotographerFactory(media, "media"))
      .forEach((media) => {
        const Template = new MediaGallery(media);
        this.photographerGallery.appendChild(Template.createMediaGallery());
      });
  }
}

const app = new App();

var indexPage = window.location.href.includes("index");

if (indexPage) {
  app.displayPhotographers();
} else if (!indexPage) {
  app.displayProfile();
  app.displayGallery();
}
