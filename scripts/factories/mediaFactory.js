import { Video } from "../models/video.js";
import { Photo } from "../models/photo.js";

export class MediaFactory {
  constructor(data) {
    if (data.image == null) {
      return new Video(data);
    } else {
      return new Photo(data);
    }
  }
}
