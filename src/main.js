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
  if (user.emailVerified) {
    // Si el usuario está verificado se redirige a HOME
    window.location.hash = '#/home';
    // console.log('Usuario logueado y verificado', user.emailVerified);
  } else {
    // El usuario se desloguea si no está verificado
    logOut();
    // console.log('No hay usuario logueado ni verificado');
  }
});
