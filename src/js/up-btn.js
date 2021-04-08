import refs from './refs';

window.addEventListener('scroll', scroll);
function scroll(event) {
  if(event.currentTarget.scrollY>600) {
    refs.upBtn.classList.remove('visually-hidden');
  }
  if(event.currentTarget.scrollY<=600){
    refs.upBtn.classList.add('visually-hidden');
  }
}
refs.upBtn.addEventListener('click', upBtn);


function upBtn(event) {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
}