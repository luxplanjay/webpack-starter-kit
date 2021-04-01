import 'firebase/auth';
import 'firebase/firestore';

import firebase from 'firebase/app';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyD5Lz8Xolb4aTDugqG9oqiD3TvNrCFheKg',
  authDomain: 'filmoteka-d2783.firebaseapp.com',
  projectId: 'filmoteka-d2783',
  storageBucket: 'filmoteka-d2783.appspot.com',
  messagingSenderId: '870527658773',
  appId: '1:870527658773:web:6c74f3043e4340ced1d71c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const registerForm = document.querySelector('.modal__form-registration');
const loginForm = document.querySelector('.modal__form-login');
const signUpBtn = document.querySelector('.site-nav__signup');
const signInBtn = document.querySelector('.site-nav__signin');
const signUpModal = document.querySelector('.backdrop[data-modal-signup]');
const signInModal = document.querySelector('.backdrop[data-modal-signin]');

registerForm.addEventListener('submit', e => {
  e.preventDefault();
  let password = '';
  const email = e.target.email.value;
  if (e.target.pass.value === e.target.secondpass.value) {
    password = e.target.pass.value;
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
});

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.pass.value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Signed in
      var user = userCredential.user;
      // ...
      console.log('good');
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('bad');
    });
});

signUpBtn.addEventListener('click', () => {
  signUpModal.classList.remove('is-hidden');
  signUpModal.addEventListener('click', hideSignUpModal);
  window.addEventListener('keydown', hideSignUpEsc);
});
signInBtn.addEventListener('click', () => {
  signInModal.classList.remove('is-hidden');
  signInModal.addEventListener('click', hideSignInModal);
  window.addEventListener('keydown', hideSignInEsc);
});
function hideSignInModal() {
  signInModal.classList.add('is-hidden');
}
function hideSignUpModal() {
  signUpModal.classList.add('is-hidden');
}
function hideSignInEsc(e) {
  if (e.key === 'Escape') hideSignInModal();
}
function hideSignUpEsc(e) {
  if (e.key === 'Escape') hideSignUpModal();
}
