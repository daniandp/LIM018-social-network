import { components } from '../view/index.js';
import { prueba } from '../firebase/authGoogle.js';

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
  const btnGoogle = container.querySelector('#btn-google-login');
  btnGoogle.addEventListener('click', prueba);
  return container;
};

const showRegister = () => {
  container.removeAttribute('class');
  container.setAttribute('class', 'screen-register');
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
// console.log(showLogin);
// const btnGoogle = showLogin().getElementById('btn-google-login');

// btnGoogle.addEventListener('click', prueba());
export { changeView };
