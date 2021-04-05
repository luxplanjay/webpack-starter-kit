import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import refs from './refs';
import PNotify from '../../../node_modules/pnotify/dist/es/PNotify.js';

const firebaseConfig = {
  apiKey: 'AIzaSyD5Lz8Xolb4aTDugqG9oqiD3TvNrCFheKg',
  authDomain: 'filmoteka-d2783.firebaseapp.com',
  projectId: 'filmoteka-d2783',
  storageBucket: 'filmoteka-d2783.appspot.com',
  messagingSenderId: '870527658773',
  appId: '1:870527658773:web:6c74f3043e4340ced1d71c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//Check is signet
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.

    refs.signUpBtn.classList.add('is-hidden');
    refs.signInBtn.classList.add('is-hidden');
    refs.logOutBtn.classList.remove('is-hidden');
    PNotify.success({
      title: 'Success!',
      text: 'You have successfully signed in.',
    });
  } else {
    // No user is signed in.
    refs.signUpBtn.classList.remove('is-hidden');
    refs.signInBtn.classList.remove('is-hidden');
    refs.logOutBtn.classList.add('is-hidden');
  }
});
// Create account
refs.registerForm.addEventListener('submit', e => {
  e.preventDefault();
  let password = '';
  const email = e.target.email.value;
  if (e.target.pass.value === e.target.secondpass.value) {
    password = e.target.pass.value;
  } else {
    PNotify.error({
      title: 'Error',
      text: 'Passwords did not match',
    });
  }
  refs.signUpSpinner.classList.remove('is-hidden');
  document.querySelector('.signup-wpapper').classList.add('load');
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Signed in
      var user = userCredential.user;
      document.querySelector('.signup-wpapper').classList.remove('load');

      PNotify.success({
        title: 'Success!',
        text: 'Your account successfully created.',
      });
    })
    .then(() => {
      refs.signUpSpinner.classList.add('is-hidden');
      refs.signUpModal.classList.add('is-hidden');
      e.target.email.value = null;
      e.target.pass.value = null;
      e.target.secondpass.value = null;
    })
    .catch(error => {
      document.querySelector('.signup-wpapper').classList.remove('load');
      refs.signUpSpinner.classList.add('is-hidden');
      console.log(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      PNotify.error({
        title: 'Error',
        text: errorMessage,
      });
    });
});

// Singin
refs.loginForm.addEventListener('submit', e => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.pass.value;
  refs.signinSpinner.classList.remove('is-hidden');
  document.querySelector('.signin-wpapper').classList.add('load');
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Signed in
      var user = userCredential.user;

      document.querySelector('.signin-wpapper').classList.remove('load');
      console.log(user.uid);
    })
    .then(() => {
      refs.signInModal.classList.add('is-hidden');
      e.target.email.value = null;
      e.target.pass.value = null;
    })
    .catch(e => {
      var errorCode = e.code;
      var errorMessage = e.message;
      PNotify.error({
        title: 'Error',
        text: errorMessage,
      });
      document.querySelector('.signin-wpapper').classList.remove('load');
    })
    .finally(() => {
      refs.signinSpinner.classList.add('is-hidden');
      refs.loginForm.classList.remove('is-hidden');
    });
});
//Google login
const provider = new firebase.auth.GoogleAuthProvider();
const googleBtn = document.querySelector('.google-signin');
googleBtn.addEventListener('click', () => {
  firebase.auth().signInWithRedirect(provider);
  firebase
    .auth()
    .getRedirectResult()
    .then(result => {
      if (result.credential) {
        refs.signUpBtn.classList.add('is-hidden');
        refs.signInBtn.classList.add('is-hidden');
        refs.logOutBtn.classList.remove('is-hidden');
      }
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
});

//Modals closing
refs.signUpBtn.addEventListener('click', () => {
  refs.signUpModal.classList.remove('is-hidden');
  refs.signUpModal.addEventListener('click', hideSignUpModal);
  window.addEventListener('keydown', hideSignUpEsc);
});
refs.signInBtn.addEventListener('click', () => {
  refs.signInModal.classList.remove('is-hidden');
  refs.signUpNowBtn.addEventListener('click', () => {
    refs.signInModal.classList.add('is-hidden');
    refs.signUpModal.classList.remove('is-hidden');
    refs.signUpModal.addEventListener('click', hideSignUpModal);
    window.addEventListener('keydown', hideSignUpEsc);
  });
  refs.signInModal.addEventListener('click', hideSignInModal);
  window.addEventListener('keydown', hideSignInEsc);
});
refs.logOutBtn.addEventListener('click', () => {
  firebase
    .auth()
    .signOut()
    .then(
      PNotify.info({
        text: 'You have been logged out.',
      }),
    );
});
function hideSignInModal(e) {
  if (e.target === e.currentTarget) {
    refs.signInModal.classList.add('is-hidden');
  }
}
function hideSignUpModal(e) {
  if (e.target === e.currentTarget) {
    refs.signUpModal.classList.add('is-hidden');
  }
}
function hideSignInEsc(e) {
  if (e.key === 'Escape') refs.signInModal.classList.add('is-hidden');
}
function hideSignUpEsc(e) {
  if (e.key === 'Escape') refs.signUpModal.classList.add('is-hidden');
}
