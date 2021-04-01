import Lightbox from './lightbox';
import refs from './refs'
const { gallery } = refs;
const { modal } = refs;
const lightbox = new Lightbox();

gallery.addEventListener('click', event => lightbox.openLightbox(event));

modal.addEventListener('click', event => {
    if (event.target.nodeName !== "BUTTON") {
        return
  }
  if (event.target.classList.contains('play-trailer')) {
      console.log('Здесь будет callback от Алекса');
  }
  if (event.target.classList.contains('modal-button-watched')) {
    console.log('Здесь будет callback от Андрея');
}
if (event.target.classList.contains('modal-button-queue')) {
    console.log('Здесь тоже будет callback от Андрея');
}
});
