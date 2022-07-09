/* eslint-disable-next-line */
import * as myImports from "../main.js";
/* import { auth } from "../firebase/auth.js"; */

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
  myImports.container.innerHTML = '';
  switch (route) {
    case '': { return myImports.showWelcome(); }
    case '#/login': { return myImports.showLogin(); }
    case '#/register': { return myImports.showRegister(); }
    case '#/home': { return myImports.showHome(); }
    default: myImports.container.innerHTML = 'Error 404 (╯°□°）╯︵ ┻━┻';
      return myImports.container;
  }
  // console.log(route);
};
export { changeView };
