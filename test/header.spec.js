import header, { scrollUp } from '../src/view/header.js';

jest.mock('../src/firebase/auth');

describe('HEADER', () => {
  document.body.appendChild(header());
  global.scrollTo = jest.fn();
  it('el scroll vuelva a 0 al ejecutar la función', () => {
    scrollUp();
    expect(global.scrollTo).toHaveBeenCalled();
  });

  it('verifica si el menú hamburguesa tiene la clase o no', () => {
    const menuHeader = document.querySelector('.nav-toggle');
    const navOptions = document.querySelector('.nav-options');
    expect(menuHeader instanceof HTMLElement).toBe(true);
    expect(navOptions instanceof HTMLElement).toBe(true);
    expect(navOptions.classList.contains('nav-options_visible')).toBeFalsy();
    menuHeader.click();
    expect(navOptions.classList.contains('nav-options_visible')).toBeTruthy();
  });
});
