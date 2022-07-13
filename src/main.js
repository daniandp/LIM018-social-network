// import { app } from './firebase/conection.js';
/* eslint-disable-next-line */
import { changeView } from './view-controller/route.js';
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
