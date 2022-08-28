class App {
  constructor() {
    this.photographersSection = document.querySelector(".photographer-section");
    this.photographerHeader = document.querySelector(".photograph-header");
    this.photographerGallery = document.querySelector(".photograph-gallery");
    this.body = document.querySelector("main");
    this.dataApi = new Api();
  }

  async displayPhotographers() {
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

  async displayGallery() {
    const mediasData = await this.dataApi.getMediasData();

    mediasData
      .map((media) => new MediaFactory(media))
      .forEach((media) => {
        const Template = new MediaGallery(media);
        this.photographerGallery.appendChild(Template.createMediaGallery());
      });
  }

  async displayLightBox() {
    await this.displayGallery();
    const mediasData = await this.dataApi.getMediasData();
    const mediasLinks = document.querySelectorAll(".card-media__link");
    const nextBtn = document.querySelector(".wrapper-carrousel__next-btn");
    const prevBtn = document.querySelector(".wrapper-carrousel__previous-btn");

    mediasLinks.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const mediaId = link.getAttribute("id");
        const mediaLightBox = new LightBox(mediaId, mediasData);
        mediaLightBox.display();
      })
    );

    nextBtn.addEventListener("click", () => {
      const currentMediaLink = document.querySelector(".photograph-carrousel__media");
      const mediaId = currentMediaLink.getAttribute("id");
      const mediaLightBox = new LightBox(mediaId, mediasData);
      mediaLightBox.next();
    });

    prevBtn.addEventListener("click", () => {
      const currentMediaLink = document.querySelector(".photograph-carrousel__media");
      const mediaId = currentMediaLink.getAttribute("id");
      const mediaLightBox = new LightBox(mediaId, mediasData);
      mediaLightBox.previous();
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

  async sortByCategories() {
    const dorpdownListItems = document.querySelectorAll(".dropdown__list-item");
    const mediasData = await this.dataApi.getMediasData();
    const sortMedias = new SortMedias(mediasData);

    dorpdownListItems.forEach((item) => {
      item.addEventListener("click", () => {
        sortMedias.byOption(item.id);
      });
    });
  }
}

const app = new App();
var indexPage = window.location.href.includes("index");

if (indexPage) {
  app.displayPhotographers();
} else if (!indexPage) {
  app.displayProfile();
  app.displayLightBox();
  app.displayLikesBox();
  app.sortByCategories();
}
