/* eslint-disable-next-line */
import { auth, stateUser, logOut } from './firebase/auth.js';
import { changeView } from './view-controller/route.js';

// CARGA INICIAL DE LAS RUTAS
window.addEventListener('load', () => {
  changeView(window.location.hash);
});

// CAMBIO DE LAS RUTAS
window.addEventListener('hashchange', () => {
  changeView(window.location.hash);
});

// OBSERVADOR DE ESTADO DEL USUARIO
stateUser(auth, (user) => {
  if (user !== null && user.emailVerified) {
    // SI EL USUARIO ESTÁ VERIFICADO SE REDIRIGE A HOME
    window.location.hash = '#/home';
  } else {
    // EL USUARIO SE DESLOGUEA SI NO ESTÁ VERIFICADO
    logOut();
  }
});
