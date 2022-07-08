/* eslint-disable-next-line */
import * as myImports from "../main.js";

const changeView = (route) => {
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
