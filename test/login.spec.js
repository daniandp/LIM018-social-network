import login from '../src/view/login.js';
import { logInWithEmailAndPass } from '../src/firebase/auth.js';

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
    const changeRoute = () => {
      expect(window.location.hash).toBe('#/home');
      window.removeEventListener('hashchange', changeRoute);
      done();
    };
    window.addEventListener('hashchange', changeRoute);
    logInWithEmailAndPass.mockImplementationOnce((email, password) => {
      expect(email).toBe('email@verify.com');
      expect(password).toBe('123456');
      expect(logInWithEmailAndPass).toHaveBeenCalledWith('email@verify.com', '123456');
      done();
      return Promise.resolve({
        user: {
          emailVerified: true,
        },
      });
    });
    inputEmail.value = 'email@verify.com';
    inputPass.value = '123456';
    btnLogin.click();
  });
  it('click del boton login para retorno de EMAIL NO VERIFICADO', () => {
    logInWithEmailAndPass.mockImplementationOnce((email, password) => {
      expect(email).toBe('ejemplo@gmail.com');
      expect(password).toBe('123abc');
      return Promise.resolve({
        user: {
          emailVerified: false,
        },
      });
    });
    inputEmail.value = 'ejemplo@gmail.com';
    inputPass.value = '123abc';
    btnLogin.click();
  });

  it('si la contraseña es incorrecta', () => {
    logInWithEmailAndPass.mockImplementationOnce((email, password) => {
      expect(email).toBe('email2@verify.com');
      expect(password).toBe('123abc');
      return Promise.reject(new Error('Firebase: Error (auth/wrong-password).'));
    });
    inputEmail.value = 'email2@verify.com';
    inputPass.value = '123abc';
    btnLogin.click();
  });

  it('si el usuario no está en la base de datos', () => {
    logInWithEmailAndPass.mockImplementationOnce((email, password) => {
      expect(email).toBe('notfound@verify.com');
      expect(password).toBe('123abc');
      return Promise.reject(new Error('Firebase: Error (auth/user-not-found).'));
    });
    inputEmail.value = 'notfound@verify.com';
    inputPass.value = '123abc';
    btnLogin.click();
  });

  it('si el email no tiene un formato válido', () => {
    logInWithEmailAndPass.mockImplementationOnce((email, password) => {
      expect(email).toBe('notfound@verifycom');
      expect(password).toBe('123abc');
      return Promise.reject(new Error('Firebase: Error (auth/invalid-email).'));
    });
    inputEmail.value = 'notfound@verifycom';
    inputPass.value = '123abc';
    btnLogin.click();
  });
});
