// Este es el punto de entrada de tu aplicacion
// import { app } from './firebase/conection.js';
import { changeView } from './view-controller/route.js';
import { prueba } from './firebase/authGoogle.js';

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
