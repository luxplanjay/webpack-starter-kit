import * as basicLightbox from 'basiclightbox';
import refs from './refs';

const instance = basicLightbox.create(
    `<ul class="authors-list">
      <li class="authors-list__item"><img class="authors-list__item__image" src="" alt=""><div class="authors-list__item__descr">Oleksandr Gneushev<a class="authors-list__item__descr__link" target="_blank" href="https://github.com/IamGalexing"></a></div></li>
      <li class="authors-list__item"><img class="authors-list__item__image" src="" alt=""><div class="authors-list__item__descr">Danute Kuprescenka<a class="authors-list__item__descr__link" target="_blank" href="https://github.com/Danaproject"></a></div>
      </li>
      <li class="authors-list__item"><img class="authors-list__item__image" src="" alt=""><div class="authors-list__item__descr">Andrii Chornyi<a class="authors-list__item__descr__link" target="_blank" href="https://github.com/andchorniy"></a></div>
      </li>
      <li class="authors-list__item"><img class="authors-list__item__image" src="" alt=""><div class="authors-list__item__descr">Anna Vasyliuk<a class="authors-list__item__descr__link" target="_blank" href="https://github.com/Engineer-av"></a></div>
      </li>
      <li class="authors-list__item"><img class="authors-list__item__image" src="" alt=""><div class="authors-list__item__descr">Denys Karakoi<a class="authors-list__item__descr__link" target="_blank" href="https://github.com/Ludwig-10"></a></div>
      </li>
      <li class="authors-list__item"><img class="authors-list__item__image" src="" alt=""><div class="authors-list__item__descr">Yevgeniya Alekseyeva<a class="authors-list__item__descr__link" target="_blank" href="https://github.com/yevgeniya-alexeyeva"></a></div>
      </li>
    </ul>`, {
        onShow: (instance)=> {
            document.body.style.overflow = 'hidden';
        },
        onClose: (instance)=> {
            document.body.style.overflow = 'visible';
        }
    }
  );


refs.authorsButton.addEventListener('click', instance.show);