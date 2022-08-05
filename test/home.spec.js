/* import { getUser } from '../src/firebase/auth.js'; */
import home from '../src/view/home.js';
/* import post from '../src/view/post.js'; */
import { userImage } from '../src/view/profile.js';

jest.mock('../src/firebase/auth');

describe('HOME', () => {
  /*  let inputEmail;
  let inputPass;
  let btnLogin;
  let msgError; */
  let viewHome;
  beforeEach(() => {
    /*  inputEmail = document.getElementById('user-email');
    inputPass = document.getElementById('user-password');
    btnLogin = document.querySelector('.btn-enter');
    msgError = document.getElementById('message-error'); */
    viewHome = home();
    document.body.appendChild(viewHome);
  });

  describe('Profile', () => {
    it('Debería mostrar la imagen de perfil del usuario de google', () => {
      expect(userImage('https://lh3.googleusercontent.com/a/AItbvmn72LYQ0Zp37_jVQ7TKfGSS7U70b0APdDt0j2r-=s96-c')).toBe('https://lh3.googleusercontent.com/a/AItbvmn72LYQ0Zp37_jVQ7TKfGSS7U70b0APdDt0j2r-=s96-c');
    });
    it('Debería mostrar la imagen de perfil del usuario predeterminada', () => {
      expect(userImage(null)).toBe('img/perfilwhite.png');
    });
  });
});
