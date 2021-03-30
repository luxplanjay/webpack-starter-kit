import Lightbox from './lightbox';
import refs from './refs'
const { gallery } = refs;
const lightbox = new Lightbox();

gallery.addEventListener('click', event => lightbox.openLightbox(event));
