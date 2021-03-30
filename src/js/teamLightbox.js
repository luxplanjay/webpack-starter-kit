//for working run - npm i basiclightbox

import * as basicLightbox from 'basiclightbox';
import eleonoraUrl from '../images/team-eleonora.png';
import kirilUrl from '../images/team-kiril.png';
import romanUrl from '../images/team-roman.png';
import MaxUrl from '../images/team-max.png';
import ihorUrl from '../images/team-igor.png';
import nataliyaUrl from '../images/team-nataliya.png';
import mykolaUrl from '../images/team-mykola.png';

const markup = `<div class="team-wrapper">
<div class="team-card">
    <a class='team-card-image' href="https://github.com/hedgeinthehog" target="_blank" ><img src="${eleonoraUrl}" alt="Eleonora" class="team-image"></a>
    <p class="team-name">Eleonora</p>
    <p class="team-role">Team Lead</p>
</div>
<div class="team-card">
    <a class='team-card-image' href="https://github.com/Wh1ter" target="_blank""><img src="${kirilUrl}" alt="Kiril" class="team-image"></a>
    <p class="team-name">Kiril</p>
    <p class="team-role">Scrum Master</p>
</div>
<div class="team-card">
    <a class='team-card-image' href="https://github.com/RomanKeretsman" target="_blank" "><img src="${romanUrl}" alt="Roman" class="team-image"></a>
    <p class="team-name">Roman</p>
    <p class="team-role">Developer</p>
</div>
<div class="team-card">
    <a class='team-card-image' href="https://github.com/MaksymKasianchuk" target="_blank" "><img src="${MaxUrl}" alt="Max" class="team-image"></a>
    <p class="team-name">Max</p>
    <p class="team-role">Developer</p>
</div>
<div class="team-card">
    <a class='team-card-image' href="https://github.com/Igor-Tomilo" target="_blank" "><img src="${ihorUrl}" alt="Ihor" class="team-image"></a>
    <p class="team-name">Ihor</p>
    <p class="team-role">Developer</p>
</div>
<div class="team-card">
    <a class='team-card-image' href="https://github.com/Natalia256" target="_blank" "><img src="${nataliyaUrl}" alt="Nataliya" class="team-image"></a>
    <p class="team-name">Nataliya</p>
    <p class="team-role">Developer</p>
</div>
<div class="team-card">
    <a class='team-card-image' href="https://github.com/supert111" target="_blank" "><img src="${mykolaUrl}" alt="Mykola" class="team-image"></a>
    <p class="team-name">Mykola</p>
    <p class="team-role">Developer</p>
</div>
</div>`;
const container = document.querySelector('.js-team-modal');

container.addEventListener('click', openModal);

const modal = basicLightbox.create(markup);

function openModal() {
  modal.show();

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
