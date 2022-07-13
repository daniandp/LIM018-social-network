/* eslint-disable-next-line */
/* import * as myImports from "../main.js"; */
import { auth } from '../firebase/auth.js';
import { components } from '../view/index.js';

const container = document.getElementById('container');
const changeView = (route /* , e */) => {
  console.log(route);
  const user = auth.currentUser;
  /*    const user = auth.currentUser;
  const publicRoutes = [
    '#/login',
  ]
  if (!user && !publicRoutes.includes(route)) {
    if (e) {
      e.preventDefault();
    }
    changeView('#/login');
    return false;
  } */
  container.innerHTML = '';
  switch (route.replace('#', '')) {
    case '': {
      if (user) {
        window.location.hash = '/home';
        break;
      }
      container.appendChild(components.welcome());
      break;
    }
    case '#': {
      if (user) {
        window.location.hash = '/home';
        break;
      }
      container.appendChild(components.welcome());
      break;
    }
    case '/login': {
      console.log(user);
      if (user) {
        window.location.hash = '/home';
        break;
      }
      container.appendChild(components.login());
      break;
    }
    case '/register': {
      if (user) {
        window.location.hash = '/home';
        break;
      }
      container.appendChild(components.register());
      break;
    }
    case '/home': {
      if (user) {
        container.appendChild(components.home());
        break;
      }
      window.location.hash = '';
      break;
    }
    default: container.innerHTML = 'Error 404 (╯°□°）╯︵ ┻━┻';
      break;
  }
  // console.log(route);
};
export { changeView };
