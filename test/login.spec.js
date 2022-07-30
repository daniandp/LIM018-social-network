/**
 * @jest-environment jsdom
 */

import login from '../src/view/login.js';
// import { logInWithEmailAndPass } from '../src/firebase/auth.js';

jest.mock('../src/firebase/auth');
describe('LOGIN', () => {
  document.body.appendChild(login());
  const inputEmail = document.getElementById('user-email');
  const inputPass = document.getElementById('user-password');
  const btnLogin = document.querySelector('.btn-enter');
  const msgError = document.getElementById('message-error');

  it('click del boton login para retorno de error CAMPOS VACIOS', () => {
    expect(btnLogin instanceof HTMLElement).toBe(true);

    // PRIMER CLICK SIRVE PARA VER EL ERROR AL ESTAR LOS CAMPOS VACIOS
    btnLogin.click();
    expect(msgError.innerHTML).toBe('Debes completar todos los campos para continuar');
  });

  it('click del boton login para retorno de EMAIL VERIFICADO', (done) => {
    inputEmail.value = 'email@verify.com';
    inputPass.value = '123456';
    btnLogin.click();
    expect(msgError.innerHTML).toBe('');
    expect(window.location.hash).toBe('#/home');
    done();
  });

  it('click del boton login para retorno de EMAIL NO VERIFICADO', (done) => {
    inputEmail.value = 'ejemplo@gmail.com';
    inputPass.value = '123456';
    btnLogin.click();
    expect(msgError.innerText).toBe('El usuario no se encuentra verificado');
    done();
  });
});
