// import { app } from './firebase/conection.js';
/* eslint-disable-next-line */
import { changeView } from './view-controller/route.js';
import { components } from './view/index.js';
import {
  authGoogle, registerUserWithEmailAndPassword, logInWithEmailAndPassword, logOut,
} from './firebase/auth.js';

/* myFunction(); */

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeView(window.location.hash);
  });
};

// console.log(app);
window.addEventListener('load', () => {
  init();
});

export const container = document.getElementById('container');

export const showWelcome = () => {
  container.removeAttribute('class');
  container.setAttribute('class', 'screen-welcome');
  container.innerHTML = components.welcome();
  return container;
};

export const showLogin = () => {
  container.removeAttribute('class');
  container.setAttribute('class', 'screen-login');
  container.innerHTML = components.login();
  const btnGoogle = container.querySelector('.btn-google');
  const btnEnter = container.querySelector('.btn-enter');
  btnEnter.addEventListener('click', () => {
    const infoLogin = logInWithEmailAndPassword(
      container.querySelector('#user-email').value,
      container.querySelector('#user-password').value,
    );
    console.log(infoLogin);
  });
  btnGoogle.addEventListener('click', authGoogle);
  return container;
};

export const showRegister = () => {
  container.removeAttribute('class');
  container.setAttribute('class', 'screen-register');
  container.innerHTML = components.register();
  const btnGoogle = container.querySelector('.btn-google');
  const btnRegister = container.querySelector('.btn-enter');
  btnRegister.addEventListener('click', () => {
    registerUserWithEmailAndPassword(
      container.querySelector('#email').value,
      container.querySelector('#name').value,
      container.querySelector('#nickname').value,
      container.querySelector('#password').value,
    );
  });
  btnGoogle.addEventListener('click', authGoogle);
  return container;
};

export const showHome = () => {
  container.removeAttribute('class');
  container.setAttribute('class', 'screen-register');
  container.innerHTML = components.home();
  const btnLogOut = container.querySelector('.btn-logOut');
  btnLogOut.addEventListener('click', () => {
    logOut();
  });
};
