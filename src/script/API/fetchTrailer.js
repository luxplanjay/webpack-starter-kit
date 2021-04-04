import movieTrailer from 'movie-trailer';
import * as basicLightbox from 'basiclightbox';
import settings from '../js/settings';

export default class runTrailer {
  constructor(trailerID, trailerName) {
    this.trailerID = trailerID;
    this.trailerName = trailerName;
  }

  async fetchTrailer() {
    const id = await movieTrailer(null, {
      tmdbId: this.trailerID,
      apiKey: settings.API_KEY,
      id: true,
    });
    return id !== null ? id : this.fetchTrailerByName();
  }

  async fetchTrailerByName() {
    const idByName = await movieTrailer(this.trailerName, {
      apiKey: settings.API_KEY,
      id: true,
    });
    return idByName !== null ? idByName : '_vECE5BJbA0';
  }

  markupTrailer(id) {
    return `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="autoplay; fullscreen" class="trailer-tag"></iframe>`;
  }

  showTrailerModal(markup) {
    return basicLightbox.create(markup).show();
  }

  show() {
    this.fetchTrailer().then(this.markupTrailer).then(this.showTrailerModal);
  }
}
