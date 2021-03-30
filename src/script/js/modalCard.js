import Lightbox from './lightbox';
import galleryRef from './refs'
const lightbox = new Lightbox();

galleryRef.addEventListener('click', event => lightbox.openLightbox(event));
