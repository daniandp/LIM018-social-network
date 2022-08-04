import register, { validateEmail } from '../src/view/register.js';
import { registerUserAuth, sendEmailVerif } from '../src/firebase/auth.js';

jest.mock('../src/firebase/auth');
describe('REGISTER', () => {
  let inputEmail;
  let inputPass;
  let inputName;
  let inputNickName;
  let btnRegister;
  let msgError;

  beforeEach(() => {
    document.body.appendChild(register());
    inputEmail = document.getElementById('email');
    inputPass = document.getElementById('password');
    inputName = document.getElementById('name');
    inputNickName = document.getElementById('nickname');
    btnRegister = document.querySelector('.btn-enter');
    msgError = document.getElementById('message-error');
  });

  it('click del boton login para retorno de error CAMPOS VACIOS', () => {
    expect(btnRegister instanceof HTMLElement).toBe(true);

    // PRIMER CLICK SIRVE PARA VER EL ERROR AL ESTAR LOS CAMPOS VACIOS
    btnRegister.click();
    expect(msgError.innerHTML).toBe('Debes completar todos los campos para continuar');
  });

  describe('validateEmail', () => {
    it('validateEmail deberia ser una función', () => {
      expect(typeof validateEmail).toBe('function');
    });
    it('Para email@gmail.com no debe dar mensaje de error', () => {
      validateEmail('email@gmail.com', msgError);
      expect(msgError.innerHTML).toBe('');
    });
    it('Para email@gmail debe mostrar mensaje de error', () => {
      validateEmail('email@gmail', msgError);
      expect(msgError.innerHTML).toBe('Debes ingresar un email válido: ejemplo@dominio.com');
    });
  });
});
