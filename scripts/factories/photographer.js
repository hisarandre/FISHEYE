class PhotographerFactory {
  constructor(data, type) {
    if (type === "photographers" || type === "photographerById") {
      return new Photographer(data);
    } else if (type === "media") {
      return new Photo(data);
    } else {
      throw "Unknown type format";
    }
  }
}
