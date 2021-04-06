import * as basicLightbox from 'basiclightbox';
import refs from './refs';
import studentCards from '../templates/students-lightbox.hbs';

const instance = basicLightbox.create(studentCards(), {
  onShow: instance => {
    document.body.style.overflow = 'hidden';
  },
  onClose: instance => {
    document.body.style.overflow = 'visible';
  },
});

refs.authorsButton.addEventListener('click', instance.show);
