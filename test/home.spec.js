import { createPost, editPost } from '../src/firebase/auth.js';
import home from '../src/view/home.js';
import { querySnapshot, likeOrDisLike, showModalDelete } from '../src/view/post.js';
import { userImage } from '../src/view/profile.js';
import { divPostPublicated } from './postTemplate.js';

jest.mock('../src/firebase/auth');

describe('HOME', () => {
  let viewHome;
  let inputPost;
  let btnSharePost;
  let containerPrincipalPost;
  let btnModalConfirmDelete;
  let btnModalCancelDelete;
  let modalDelete;

  beforeEach(() => {
    viewHome = home();
    document.body.appendChild(viewHome);
    inputPost = document.getElementById('create-post');
    btnSharePost = document.getElementById('btn-share-post');
    containerPrincipalPost = document.querySelector('.container-post');
    containerPrincipalPost.innerHTML = divPostPublicated;
    btnModalConfirmDelete = document.querySelector('#btn-confirm-delete');
    btnModalCancelDelete = document.querySelector('#btn-cancel-delete');
    modalDelete = document.getElementById('modal-message-confirm-delete');
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

    describe('likeOrDisLike', () => {
      it('Si ya el usuario logueado dio like a un post debe retirar el id del usuario del array de likes', () => {
        const arrayLikes = ['sUeKi4n6tzcYVnsR93u4uX6aRzs1', 'SWyr63xtfSSUxiFCLh74YLRIOT62', 'B06Faq1V1ENbGRVkWK00MUVpgyz2'];
        const postId = '7IcWtOlNgm3Qk8RWEzOn';
        const authCurrentUserUid = 'B06Faq1V1ENbGRVkWK00MUVpgyz2';
        expect(typeof likeOrDisLike).toBe('function');
        likeOrDisLike(arrayLikes, postId, authCurrentUserUid);
        expect(editPost).toHaveBeenCalled();
      });
      it('Si el usuario le dio like debe agregar al array de likes', () => {
        const arrayLikes = ['sUeKi4n6tzcYVnsR93u4uX6aRzs1', 'SWyr63xtfSSUxiFCLh74YLRIOT62'];
        const postId = '7IcWtOlNgm3Qk8RWEzOn';
        const authCurrentUserUid = 'B06Faq1V1ENbGRVkWK00MUVpgyz2';
        expect(typeof likeOrDisLike).toBe('function');
        likeOrDisLike(arrayLikes, postId, authCurrentUserUid);
        expect(editPost).toHaveBeenCalled();
      });
    });
    describe('showModalDelete', () => {
      it('Probando eliminar', () => {
        const postId = '7IcWtOlNgm3Qk8RWEzOn';
        expect(typeof showModalDelete).toBe('function');
        showModalDelete(
          postId,
          modalDelete,
          containerPrincipalPost,
          btnModalCancelDelete,
          btnModalConfirmDelete,
        );
      });
    });
    describe('querySnapShot', () => {
      it('Recorrido de post para extraer la data', () => {
        const post = {
          uid: '123',
          likes: ['sUeKi4n6tzcYVnsR93u4uX6aRzs1', 'SWyr63xtfSSUxiFCLh74YLRIOT62', 'B06Faq1V1ENbGRVkWK00MUVpgyz2'],
        };
        const queryPost = {
          docs: [{ data: () => post }],
        };
        expect(typeof querySnapshot).toBe('function');
        querySnapshot(queryPost);
      });
    });
  });
});
