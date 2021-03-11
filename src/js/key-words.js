import refs from './refs';
import { load } from './storage';

export default {
  messageClose() {
    if (!refs.messageLibRef.classList.contains('is-hidden')) {
      refs.messageLibRef.classList.add('is-hidden');
    }
  },

  messageShow() {
    refs.messageLibRef.classList.remove('is-hidden');
  },
  messageAboutLibrary() {
    const nameLibrary = load('currentRequest');
    refs.messageLibRef.classList.remove('is-hidden');
    refs.messageLibRef.textContent = `Oops! Your "${nameLibrary}" library is empty!`;
  },
};
