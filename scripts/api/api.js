export class Api {
  constructor() {
    this._url = "data/photographers.json";
  }
  //all data
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
  //only photographers data
  async getPhotographersData() {
    const $data = await this.getData();
    return $data.photographers;
  }

  //only photographer by id
  async getPhotographerById() {
    const $data = await this.getData();
    const $idInUrl = new URL(document.location).searchParams.get("id");
    return $data.photographers.find((element) => element.id == $idInUrl);
  }

  //only media with photographer by id
  async getMediasData() {
    const $data = await this.getData();
    const $idInUrl = new URL(document.location).searchParams.get("id");
    return $data.media.filter((element) => element.photographerId == $idInUrl);
  }
}
