/**
 * @jest-environment jsdom
 */

import login from '../src/view/login.js';

jest.mock('../src/firebase/auth');
describe('login', () => {
  it('click del boton login', () => {
    document.body.appendChild(login());
    const btnLogin = document.querySelector('.btn-enter');
    expect(btnLogin instanceof HTMLElement).toBe(true);
    btnLogin.click();
    const merror = document.getElementById('message-error');
    // console.log(window.location.hash);
    expect(merror.innerHTML).toBe('Debes completar todos los campos para continuar');
    console.log(merror.innerHTML);
  });
});
