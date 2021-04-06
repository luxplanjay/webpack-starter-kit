import * as basicLightbox from 'basiclightbox';
import refs from './refs';

const template = document.querySelector('#st-light-box-template')

const instance = basicLightbox.create(template, {
  onShow: instance => {
    document.body.style.overflow = 'hidden';
  },
  onClose: instance => {
    document.body.style.overflow = 'visible';
  },
});

refs.authorsButton.addEventListener('click', instance.show);
