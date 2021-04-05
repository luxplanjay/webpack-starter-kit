import { closeModalToPressEscape } from './modal'
import refs from './refs';
import openOurTeamCard from './ourTeamRenderCard';

refs.ourTeamRef.addEventListener('click', onOurTeamClick);

function onOurTeamClick() {
    openTeamModal()
}

function openTeamModal() {
    window.addEventListener('keydown', closeModalToPressEscape);
    refs.modal.classList.add('is-open');
    refs.body.classList.add('scroll-hidden');
    refs.modalContent.innerHTML = '';

    openOurTeamCard()
}
