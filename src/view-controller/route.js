import { auth } from '../firebase/auth.js';
import { components } from '../view/index.js';

// CONTENEDOR GENERAL
const container = document.getElementById('container');

// ENRUTADOR PARA CAMBIO DE VISTAS
const changeView = (route) => {
  console.log(route);

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
    default: {
      container.innerHTML = `Error 404 Página no encontrada <br><br><br> 
      (╯°□°）╯︵ ┻━┻`;
      container.classList.add('error-style');
      break;
    }
  }
};
export { changeView };
