import refs from './refs';

const theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const themeChoice = function () {
  if (
    localStorage.getItem('theme') === 'light-theme' ||
    !localStorage.getItem('theme')
  ) {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }

  if (localStorage.getItem('theme') === 'dark-theme') {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    refs.themeInputRef.checked = true;
  }
};

themeChoice();

refs.themeInputRef.addEventListener('input', e => {
  e.target.checked
    ? localStorage.setItem('theme', 'dark-theme')
    : localStorage.setItem('theme', 'light-theme');
  themeChoice();
});
