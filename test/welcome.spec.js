import welcome from '../src/view/welcome.js';

describe('WELCOME', () => {
  let btnLogin;
  let btnRegister;

  beforeEach(() => {
    document.body.appendChild(welcome());
    btnLogin = document.getElementById('logIn');
    btnRegister = document.getElementById('singUp');
  });

  it('Verificar si existe el botón login en el componente Welcome', () => {
    expect(btnLogin instanceof HTMLElement).toBe(true);
  });

  it('Verificar si existe el botón register en el componente Welcome', () => {
    expect(btnRegister instanceof HTMLElement).toBe(true);
  });
});
