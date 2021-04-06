import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import refs from './refs';
import PNotify from '../../../node_modules/pnotify/dist/es/PNotify.js';

const db = firebase.firestore();
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
      delay: 1000,
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
      delay: 1000,
    });
  }
  refs.signUpSpinner.classList.remove('is-hidden');
  document.querySelector('.signup-wpapper').classList.add('load');
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      document.querySelector('.signup-wpapper').classList.remove('load');

      PNotify.success({
        title: 'Success!',
        text: 'Your account successfully created.',
        delay: 1000,
      });

      localStorage.setItem('watched-films', []);
      localStorage.setItem('films-queue', []);
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
      const errorCode = error.code;
      const errorMessage = error.message;
      PNotify.error({
        title: 'Error',
        text: errorMessage,
        delay: 1000,
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
      const user = userCredential.user;
      let userWatched = [];
      let userQueue = [];
      db.collection('users')
        .doc(user.uid)
        .collection('Watched')
        .doc('Markup')
        .get()
        .then(data => {
          if (data.data()) {
            userWatched = data.data().list;
          }
          localStorage.setItem('watched-films', userWatched);
        });
      db.collection('users')
        .doc(user.uid)
        .collection('Queue')
        .doc('Markup')
        .get()
        .then(data => {
          if (data.data()) {
            userQueue = data.data().list;
          }
          localStorage.setItem('films-queue', userQueue);
        });
      document.querySelector('.signin-wpapper').classList.remove('load');
    })
    .then(() => {
      refs.signInModal.classList.add('is-hidden');
      e.target.email.value = null;
      e.target.pass.value = null;
    })
    .catch(e => {
      const errorCode = e.code;
      const errorMessage = e.message;
      PNotify.error({
        title: 'Error',
        text: errorMessage,
        delay: 1000,
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
      let userWatched = [];
      let userQueue = [];
      db.collection('users')
        .doc(user.uid)
        .collection('Watched')
        .doc('Markup')
        .get()
        .then(data => {
          if (data.data().list) {
            userWatched = data.data().list;
          }
          localStorage.setItem('watched-films', userWatched);
        });
      db.collection('users')
        .doc(user.uid)
        .collection('Queue')
        .doc('Markup')
        .get()
        .then(data => {
          if (data.data().list) {
            userQueue = data.data().list;
          }
          localStorage.setItem('films-queue', userQueue);
        });
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
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
        delay: 1000,
      }),
      localStorage.setItem('watched-films', []),
      localStorage.setItem('films-queue', []),
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

// hide signUpBtn in mobile screen
const mobileDevice = window.matchMedia("(max-width: 767px)");

mobileDevice.addListener(handleDeviceChange);

function handleDeviceChange(e) {
  if (e.matches) { refs.signUpBtn.classList.add("visually-hidden") }
  else refs.signUpBtn.classList.remove("visually-hidden");
}

handleDeviceChange(mobileDevice);
