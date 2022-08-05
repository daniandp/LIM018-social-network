import { getUser } from '../src/firebase/auth.js';
import home from '../src/view/home.js';
import post from '../src/view/post.js';
import profile from '../src/view/profile.js';

jest.mock('../src/firebase/auth');

describe('HOME', () => {
  /*  let inputEmail;
  let inputPass;
  let btnLogin;
  let msgError; */
  let viewHome;
  let divProfile;
  beforeEach(() => {
    /*  inputEmail = document.getElementById('user-email');
    inputPass = document.getElementById('user-password');
    btnLogin = document.querySelector('.btn-enter');
    msgError = document.getElementById('message-error'); */
    viewHome = home();
    divProfile = viewHome.querySelector('.profile-card');
    // profile(divProfile);
    // post(viewHome);
    document.body.appendChild(viewHome);
  });

  describe('Profile', () => {
    it('Debería haberse llamado la función', () => {
      expect(profile).toHaveBeenCalled();
    });

    it('Obtiene el nombre y la foto de perfil del usuario', () => {
      //profile();

    });
  });
});
