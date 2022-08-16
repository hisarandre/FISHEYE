class MediaFactory {
  constructor(data) {
    if (data.image == null) {
      return new Video(data);
    } else {
      return new Photo(data);
    }
  }
}
