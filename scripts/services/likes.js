import { MediaFactory } from "../factories/MediaFactory.js";

export class Likes {
  constructor(mediasData) {
    this.mediasData = mediasData;
  }

  getAllLikes() {
    var totalLikes = 0;

    this.mediasData
      .map((media) => new MediaFactory(media))
      .forEach((media) => {
        totalLikes += media.likes;
      });

    return totalLikes;
  }

  getMediaLiked(totalLikes) {
    //get all media liked
    const btnLikes = document.querySelectorAll(".card-media__infos--likes");

    btnLikes.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.target.classList.toggle("active");
        var likesOfMedia = parseInt(e.target.textContent);

        if (e.target.classList.contains("active")) {
          totalLikes++;
          likesOfMedia++;
          document.querySelector(".likes-box__likes").innerHTML = totalLikes;
          e.target.classList.add("active");
          e.target.innerHTML = likesOfMedia;
        } else {
          totalLikes--;
          likesOfMedia--;
          document.querySelector(".likes-box__likes").innerHTML = totalLikes;
          e.target.classList.remove("active");
          e.target.innerHTML = likesOfMedia;
        }
      });
    });
  }
}
