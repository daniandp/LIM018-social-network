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
  window.addEventListener('hashchange', (/* e */) => {
    changeView(window.location.hash/* , e */);
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
  const btnEnter = container.querySelector('#hola');
  btnEnter.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log(e);
    console.log(e.target);
    console.log(e.currentTarget);
    logInWithEmailAndPassword(
      container.querySelector('#user-email').value,
      container.querySelector('#user-password').value,
      container.querySelector('#message-error'),
      changeView,
    );
    // e.preventDefault();
  /*   if (container.querySelector('#message-error').textContent === '') {
      console.log(container.querySelector('#message-error').textContent);
      e.preventDefault();
    } */
    /*     console.log(container.querySelector('#message-error').textContent); */
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
