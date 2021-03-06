// import './refs';
import { LIGHT, DARK } from './themes';
import { load, save, remove } from './storage';

const refs = {
  checkboxEl: document.querySelector('#theme-switch-toggle'),
  bodyEl: document.querySelector('body'),
}

function onCheckboxChange() {
  event.currentTarget.checked ? onCheckboxChecked() : onCheckboxNotChecked();
}

function onCheckboxChecked() {
  refs.bodyEl.classList.add(DARK);
  refs.bodyEl.classList.remove(LIGHT);
  save('Theme', DARK);
  refs.checkboxEl.checked = true;
}

function onCheckboxNotChecked() {
  refs.bodyEl.classList.add(LIGHT);
  refs.bodyEl.classList.remove(DARK);
  save('Theme', LIGHT);
  refs.checkboxEl.checked = false;
}

function currentTheme() {
  const savedTheme = load('Theme');
  if (savedTheme === LIGHT) {
    onCheckboxNotChecked();
    return;
  }
  if (savedTheme === DARK) {
    onCheckboxChecked();
    return;
  }
}

currentTheme();

refs.checkboxEl.addEventListener('change', onCheckboxChange);