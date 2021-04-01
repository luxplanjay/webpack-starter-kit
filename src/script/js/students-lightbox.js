import * as basicLightbox from 'basiclightbox';
import refs from './refs';

const instance = basicLightbox.create(
    `<ul class="authors-list">
      <li class="authors-list__item"><img class="authors-list__item__image" src="" alt=""><div class="authors-list__item__descr"></div></li>
      <li class="authors-list__item"><img class="authors-list__item__image" src="" alt=""><div class="authors-list__item__descr"></div>
      </li>
      <li class="authors-list__item"><img class="authors-list__item__image" src="" alt=""><div class="authors-list__item__descr"></div>
      </li>
      <li class="authors-list__item"><img class="authors-list__item__image" src="" alt=""><div class="authors-list__item__descr"></div>
      </li>
      <li class="authors-list__item"><img class="authors-list__item__image" src="" alt=""><div class="authors-list__item__descr"></div>
      </li>
      <li class="authors-list__item"><img class="authors-list__item__image" src="" alt=""><div class="authors-list__item__descr"></div>
      </li>
    </ul>`, {
        onShow: (instance)=> {
            document.body.style.overflow = 'hidden';
        },
        onclose: (instance)=> {
            document.body.style.overflow = 'visible';
        }
    }
  );


refs.authorsButton.addEventListener('click', instance.show);