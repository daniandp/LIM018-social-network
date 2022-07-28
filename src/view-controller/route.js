import { auth } from '../firebase/auth.js';
import { components } from '../view/index.js';

// CONTENEDOR GENERAL
const container = document.getElementById('container');

// ENRUTADOR PARA CAMBIO DE VISTAS
const changeView = (route) => {
  const user = auth.currentUser;

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
        container.appendChild(components.header());
        container.appendChild(components.home());
        break;
      }
      window.location.hash = '';
      break;
    }
    default: {
      container.appendChild(components.error404());
      break;
    }
  }
};
export { changeView };
