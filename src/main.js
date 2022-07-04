// Este es el punto de entrada de tu aplicacion
// import { app } from './firebase/conection.js';
import { changeView } from './view-controller/route.js';
// import { prueba } from './firebase/authGoogle';

/* myFunction(); */

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};

// console.log(app);
window.addEventListener('load', init);

// const btnGoogle = document.getElementById('btn-google-login');
// btnGoogle.addEventListener('click', prueba());
