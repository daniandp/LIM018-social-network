import login from '../src/view/login.js';

jest.mock('../src/firebase/auth');
describe('LOGIN', () => {
  let inputEmail;
  let inputPass;
  let btnLogin;
  let msgError;
  beforeEach(() => {
    document.body.appendChild(login());
    inputEmail = document.getElementById('user-email');
    inputPass = document.getElementById('user-password');
    btnLogin = document.querySelector('.btn-enter');
    msgError = document.getElementById('message-error');
  });

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
    setTimeout(() => {
      expect(window.location.hash).toBe('#/home');
      done();
    }, 0);
  });

  it('click del boton login para retorno de EMAIL NO VERIFICADO', (done) => {
    inputEmail.value = 'ejemplo@gmail.com';
    inputPass.value = '123abc';
    btnLogin.click();
    setTimeout(() => {
      expect(msgError.innerText).toBe('El usuario no se encuentra verificado');
      done();
    }, 0);
  });

  // eslint-disable-next-line jest/no-focused-tests
  it('si la contraseña es incorrecta', (done) => {
    inputEmail.value = 'email2@verify.com';
    inputPass.value = '123abc';
    btnLogin.click();
    setTimeout(() => {
      expect(msgError.innerHTML).toBe('Contraseña incorrecta');
      done();
    }, 0);

    // const asyncExpects = () => new Promise((resolve) => {
    //  resolve(expect(msgError.innerHTML).toBe('Contraseña incorrecta'));
    // });

    // asyncExpects().then(() => done());
  });

  it('si el usuario no está en la base de datos', (done) => {
    inputEmail.value = 'notfound@verify.com';
    inputPass.value = '123abc';
    btnLogin.click();
    setTimeout(() => {
      expect(msgError.innerHTML).toBe('Usuario no encontrado');
      done();
    }, 0);
  });

  it('si el email no tiene un formato válido', (done) => {
    inputEmail.value = 'notfound@verifycom';
    inputPass.value = '123abc';
    btnLogin.click();
    setTimeout(() => {
      expect(msgError.innerHTML).toBe('Email inválido');
      done();
    }, 0);
  });
});
