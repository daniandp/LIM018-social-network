/* eslint-disable-next-line */
/* import * as myImports from "../main.js"; */
/* import { auth } from "../firebase/auth.js"; */
import { components } from '../view/index.js';

const container = document.getElementById('container');
const changeView = (route /* , e */) => {
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
  switch (route) {
    case '': { return container.appendChild(components.welcome()); }
    case '#/login': { return container.appendChild(components.login()); }
    case '#/register': { return container.appendChild(components.register()); }
    case '#/home': { return container.appendChild(components.home()); }
    default: container.innerHTML = 'Error 404 (╯°□°）╯︵ ┻━┻';
      return container;
  }
  // console.log(route);
};
export { changeView };
