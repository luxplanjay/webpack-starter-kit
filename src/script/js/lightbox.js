import movieCard from '../templates/movieCard.hbs';
import MovieApi from '../API/fetchMovie';
const movieInfo = new MovieApi();

export default class Lightbox{
    constructor() {
        this.refs = this.getRefs();
    }

    getRefs() {
        const refs = {};
        refs.infoCard = document.querySelector('.lightbox__content');
        refs.lightbox = document.querySelector('.js-lightbox');
        refs.overlay = document.querySelector('.lightbox__overlay');
        refs.closeBtn = document.querySelector('button[data-action="close-lightbox"]');        
        return refs;
    }
    openLightbox(event) {
        event.preventDefault();
        if (event.target.nodeName !== 'IMG') return;
        this.createMarkup(event);
        this.refs.lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        this.refs.overlay.addEventListener('click', () => this.closeLightbox());
        this.refs.closeBtn.addEventListener('click', () => this.closeLightbox());
        window.addEventListener('keydown', event => this.closeOnKeydown(event));
    }
    closeLightbox() {
        this.refs.lightbox.classList.remove('is-open');
        document.body.style.overflow = 'visible';
        this.refs.infoCard.innerHTML = '';
        this.refs.overlay.removeEventListener('click', () => this.closeLightbox());
        this.refs.closeBtn.removeEventListener('click', () => this.closeLightbox());
        window.removeEventListener('keydown', event => this.closeOnKeydown(event));
    }
    closeOnKeydown(event) {
         if (event.code === "Escape") {
            this.closeLightbox();
         };
    }
    createMarkup(event) {
        movieInfo.fetchMovie(event.target.id)
        .then(result => {
            console.log(result);
            const genres = result.genres.map(item => item.name);
            result.genres = genres.join(', ');
            result.popularity = parseFloat(result.popularity).toFixed(1);
            this.refs.infoCard.insertAdjacentHTML('beforeend', movieCard(result));
        });
    }
}
