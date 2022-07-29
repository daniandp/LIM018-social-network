/**
 * @jest-environment jsdom
 */

import login from '../src/view/login.js';
import { logInWithEmailAndPass } from '../src/firebase/auth.js';

jest.mock('../src/firebase/auth');
describe('login', () => {
  it('click del boton login', () => {
    document.body.appendChild(login());
    const btnLogin = document.querySelector('.btn-enter');
    expect(btnLogin instanceof HTMLElement).toBe(true);
    // PRIMER CLICK SIRVE PARA VER EL ERROR AL ESTAR LOS CAMPOS VACIOS
    btnLogin.click();
    const msgError = document.getElementById('message-error');
    expect(msgError.innerHTML).toBe('Debes completar todos los campos para continuar');
    console.log(msgError.innerHTML);
    const inputEmail = document.getElementById('user-email');
    const inputPass = document.getElementById('user-password');
    inputEmail.value = 'ejemplo@gmail.com';
    inputPass.value = '123456';
    // EL SEGUNDO CLICK SIRVE PARA VERICAR SI LOS CAMPOS NO ESTAN VACIOS
    btnLogin.click();
    expect(msgError.innerHTML).toBe('');
    console.log(msgError.innerHTML);
    // logInWithEmailAndPass(true).then((userCredential) => {
    //   const user = userCredential.user;
    //   console.log(user);
    //   expect(user.emailVerified).toBe(true);
    //   expect(msgError.innerText).toBe('');
    //   console.log(msgError.innerText);
    // });
    logInWithEmailAndPass(false).then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      expect(!user.emailVerified).toBe(true);
      expect(msgError.innerText).toBe('El usuario no se encuentra verificado');
      console.log(msgError.innerText);
    });
    console.log(window.location.hash);
  });
});
