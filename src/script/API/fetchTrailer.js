import movieTrailer from 'movie-trailer';
import * as basicLightbox from 'basiclightbox';
import settings from '../js/settings';

export default class runTrailer {
  constructor(trailerID) {
    this.trailerID = trailerID;
  }

  async fetchTrailer() {
    const id = await movieTrailer(null, {
      tmdbId: this.trailerID,
      apiKey: settings.API_KEY,
      id: true,
    });
    console.log('id', id);
    return id !== null ? id : '953J_jPm7-s';
  }

  markupTrailer(id) {
    return `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="autoplay; fullscreen"></iframe>`;
  }

  trailerModal(markup) {
    return basicLightbox
      .create(markup, {
        onShow: () => {
          document.body.style.overflow = 'hidden';
        },
        onclose: () => {
          document.body.style.overflow = 'visible';
        },
      })
      .show();
  }

  show() {
    this.fetchTrailer().then(this.markupTrailer).then(this.trailerModal);
  }
}
