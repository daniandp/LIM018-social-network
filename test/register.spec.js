import register, { validateEmail } from '../src/view/register.js';
import { registerUserAuth /* sendEmailVerif */ /* registerUserFirestore */ } from '../src/firebase/auth.js';

jest.mock('../src/firebase/auth');
describe('REGISTER', () => {
  let inputEmail;
  let inputPass;
  let inputName;
  let inputNickName;
  let btnRegister;
  let msgError;
  let btnModal;

  beforeEach(() => {
    document.body.appendChild(register());
    inputEmail = document.getElementById('email');
    inputPass = document.getElementById('password');
    inputName = document.getElementById('name');
    inputNickName = document.getElementById('nickname');
    btnRegister = document.querySelector('.btn-enter');
    msgError = document.getElementById('message-error');
    btnModal = document.querySelector('.btn-redirect');
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

  it('Evento register', () => {
    // const mockFn = jest.fn();
    expect(inputEmail instanceof HTMLElement).toBe(true);
    registerUserAuth.mockImplementationOnce((email, password) => {
      expect(email).toBe('email@verify.com');
      expect(password).toBe('123456');
      return Promise.resolve({
        user: {
          email: 'email@verify.com',
          pass: '123456',
          uid: 'asb',
          photoURL: 'fdgg',
        },
      });
    });

    /* registerUserFirestore.mockImplementationOnce((email, name, nickname, uid, photoURL) => {
      expect(email).toBe('email@verify.com');
      expect(name).toBe('123456');
      expect(nickname).toBe('rosalia');
      expect(uid).toBe('asb');
      expect(photoURL).toBe('fdgg');
      expect(registerUserFirestore).toHaveBeenCalled();
    }); */
    /*    sendEmailVerif.mockImplementationOnce(() => {
      console.log('Estamos aqui');
      expect(sendEmailVerif).toHaveBeenCalled();
    }); */
    inputEmail.value = 'email@verify.com';
    inputPass.value = '123456';
    inputName.value = 'rosalia';
    inputNickName.value = 'bizcochito';
    btnRegister.click();
  });
  it('Muestra el error si el correo ya esta en uso', () => {
    registerUserAuth.mockImplementationOnce((email, password) => {
      expect(email).toBe('email@verify.com');
      expect(password).toBe('123abc');
      return Promise.reject(new Error('Firebase: Error (auth/email-already-in-use).'));
    });
    inputEmail.value = 'email@verify.com';
    inputPass.value = '123abc';
    inputName.value = 'rosalia';
    inputNickName.value = 'bizcochito';
    btnRegister.click();
  });

  it('Muestra el error si la contraseña tiene menos de 6 caracteres', () => {
    registerUserAuth.mockImplementationOnce((email, password) => {
      expect(email).toBe('email@verify.com');
      expect(password).toBe('123');
      return Promise.reject(new Error('Firebase: Password should be at least 6 characters (auth/weak-password).'));
    });
    inputEmail.value = 'email@verify.com';
    inputPass.value = '123';
    inputName.value = 'rosalia';
    inputNickName.value = 'bizcochito';
    btnRegister.click();
  });

  it('si el email no tiene un formato válido', () => {
    registerUserAuth.mockImplementationOnce((email, password) => {
      expect(email).toBe('email@verify');
      expect(password).toBe('123abc');
      return Promise.reject(new Error('Firebase: Error (auth/invalid-email).'));
    });
    inputEmail.value = 'email@verify';
    inputPass.value = '123abc';
    inputName.value = 'rosalia';
    inputNickName.value = 'bizcochito';
    btnRegister.click();
  });
  it('Otro error que no se ha considerado en el catch', () => {
    registerUserAuth.mockImplementationOnce((email, password) => {
      expect(email).toBe('email@verify.com');
      expect(password).toBe('123abc');
      return Promise.reject(new Error('Firebase: Error'));
    });
    inputEmail.value = 'email@verify.com';
    inputPass.value = '123abc';
    inputName.value = 'rosalia';
    inputNickName.value = 'bizcochito';
    btnRegister.click();
  });
  it('Deberia cambiar a #/login', (done) => {
    expect(btnModal instanceof HTMLElement).toBe(true);
    const changeRoute = () => {
      expect(window.location.hash).toBe('#/login');
      window.removeEventListener('hashchange', changeRoute);
      done();
    };
    window.addEventListener('hashchange', changeRoute);
    btnModal.click();
  });
});
