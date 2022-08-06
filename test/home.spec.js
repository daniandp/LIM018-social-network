import { createPost } from '../src/firebase/auth.js';
import home from '../src/view/home.js';
/* import post from '../src/view/post.js'; */
import { userImage } from '../src/view/profile.js';
import { divPostPublicated } from './postTemplate.js';

jest.mock('../src/firebase/auth');

describe('HOME', () => {
  let viewHome;
  let inputPost;
  let btnSharePost;
  let containerPrincipalPost;
  let threeDots;
  let contbtnsEditAndDelete;
  beforeEach(() => {
    viewHome = home();
    document.body.appendChild(viewHome);
    inputPost = document.getElementById('create-post');
    btnSharePost = document.getElementById('btn-share-post');
    containerPrincipalPost = document.querySelector('.container-post');
    containerPrincipalPost.innerHTML = divPostPublicated;
    threeDots = containerPrincipalPost.querySelector('.bi-three-dots');
    contbtnsEditAndDelete = containerPrincipalPost.querySelector('.cont-btns-edit-delete');
  });

  describe('PROFILE', () => {
    it('Debería mostrar la imagen de perfil del usuario de google', () => {
      expect(userImage('https://lh3.googleusercontent.com/a/AItbvmn72LYQ0Zp37_jVQ7TKfGSS7U70b0APdDt0j2r-=s96-c')).toBe('https://lh3.googleusercontent.com/a/AItbvmn72LYQ0Zp37_jVQ7TKfGSS7U70b0APdDt0j2r-=s96-c');
    });
    it('Debería mostrar la imagen de perfil del usuario predeterminada', () => {
      expect(userImage(null)).toBe('img/perfilwhite.png');
    });
  });

  describe('POST', () => {
    it('Vaciando el input de los placeholders ', () => {
      expect(inputPost instanceof HTMLElement).toBe(true);
      inputPost.textContent = '¿Qué quieres compartir, gamer?';
      inputPost.click();
      expect(inputPost.textContent).toBe('');
    });

    it('Creando y publicando el post', () => {
      expect(btnSharePost instanceof HTMLElement).toBe(true);
      inputPost.click();
      inputPost.textContent = 'Hola mundo';
      btnSharePost.click();
      expect(inputPost.textContent).toBe('¿Qué quieres compartir, gamer?');
      expect(createPost).toHaveBeenCalled();
      // Para el caso contrario
      inputPost.click();
      btnSharePost.click();
      expect(inputPost.textContent).toBe('Debes escribir algo en tu publicación');
    });

    it('Ocultar o mostrar el menú de editar y eliminar ', async () => {
      expect(threeDots instanceof HTMLElement).toBe(true);
      expect(contbtnsEditAndDelete.classList.contains('three-dots-visible')).toBe(false);
      await threeDots.click();
      expect(contbtnsEditAndDelete.classList.contains('three-dots-visible')).toBe(true);
    });
  });
});
