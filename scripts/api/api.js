class Api {
  constructor() {
    this._url = "././data/photographers.json";
  }

  async getData() {
    return fetch(this._url)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .catch(function (err) {
        console.log("an error occurs", err);
      });
  }

  async getPhotographersData() {
    const data = await this.getData();
    return data.photographers;
  }

  async getPhotograperById(photographerId) {
    const data = await this.getData();
    return data.photographers.find((element) => element.id == photographerId);
  }

  async getMediasData(photographerId) {
    const data = await this.getData();

    return data.media.filter((element) => element.photographerId == photographerId);
  }
}
