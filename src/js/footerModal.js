import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';

import footerTpl from '../templates/footerModal.hbs';

const openFooterModal = document.querySelector('#footer-modal');

const showFooterModal = function () {
  const modal = basicLightbox.create(footerTpl());
  console.log(`modal`, modal);

  //   //         , {
  //   //     onShow: instance => {
  //   //       instance.element().querySelector('.closeModalBtn').onclick =
  //   //         instance.close;
  //   //     },
  //   //   });
  modal.show();

  const closeModalByEsc = function (event) {
    if (event.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalEsc);
    }
  };
  document.addEventListener('keydown', closeModalByEsc);
};

openFooterModal.addEventListener('click', showFooterModal);
