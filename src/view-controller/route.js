import { components } from '../view/index.js';

const container = document.getElementById('container');
const showWelcome = () => {
  container.removeAttribute('class');
  container.setAttribute('class', 'screen-welcome');
  container.innerHTML = components.welcome();
  return container;
};

const showLogin = () => {
  container.removeAttribute('class');
  container.setAttribute('class', 'screen-login');
  container.innerHTML = components.login();
  return container;
};

const showRegister = () => {
  container.removeAttribute('class');
  container.setAttribute('class', 'screen-login');
  container.innerHTML = components.register();
  return container;
};
const changeView = (route) => {
  container.innerHTML = '';
  switch (route) {
    case '': { return showWelcome(); }
    case '#/login': { return showLogin(); }
    case '#/register': { return showRegister(); }
    default: return 'hola';
  }
  // console.log(route);
};

export { changeView };
