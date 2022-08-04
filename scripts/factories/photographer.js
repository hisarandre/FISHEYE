class PhotographerFactory {
  constructor(data, type) {
    if (type === "photographers" || type === "photographerById") {
      return new Photographer(data);
    } else if (type === "media") {
      //console.log("les medias", data);
      if (data.image == null) {
        return new Video(data);
      } else {
        return new Photo(data);
      }
    } else {
      throw "Unknown type format";
    }
  }
}
