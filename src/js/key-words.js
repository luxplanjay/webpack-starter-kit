import refs from './refs';
import { load } from './storage';
export default function messageAboutLibrary() {
  const nameLibrary = load('currentRequest');
  refs.messageLibRef.classList.remove('is-hidden');
  refs.messageLibRef.textContent = `Oops! Your "${nameLibrary}" library is empty!`;
}
