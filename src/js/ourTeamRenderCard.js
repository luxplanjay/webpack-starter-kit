import refs from './refs';
import teamCardTpl from '../tamplates/teamModal.hbs';

function openOurTeamCard(teamCard) {

    let markup = '';

    markup = teamCardTpl(teamCard);

    refs.modalContent.insertAdjacentHTML('beforeend', markup);
}

export default openOurTeamCard;