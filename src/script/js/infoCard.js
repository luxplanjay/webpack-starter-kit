import Lightbox from './lightbox';
const lightbox = new Lightbox();

const galleryRef = document.querySelector('.movies__list');
galleryRef.addEventListener('click', event => lightbox.openLightbox(event));
