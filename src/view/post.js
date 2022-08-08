import {
  createPost, auth, getPost, getUser, deletePost, editPost,
} from '../firebase/auth.js';

export const querySnapshot = (queryPost) => {
  const arrPostsandUsers = []; // array que va a almacenar las promesas
  const containerPostPublicated = document.querySelector('.container-post');
  queryPost.forEach((post) => {
    // RELACIONANDO POSTS Y USUARIOS
    const objPostandUser = getUser(post.data().uid)
      .then((user) => ({ post, user }));
    arrPostsandUsers.push(objPostandUser);
  });
  // RESOLVIENDO TODAS LAS PROMESAS PARA PINTAR LOS POSTS DE FORMA ORDENADA
  Promise.all(arrPostsandUsers)
    .then((postsByUsers) => {
      containerPostPublicated.innerHTML = '';
      postsByUsers.forEach(({ post, user }) => {
        const dateNumber = post.data().datePost;
        const date = new Date(Number(dateNumber));
        const datePostFormat = `${(date.getDate()).toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        const userData = user.data();
        const userName = userData.name;
        const userImgProfile = user.data().imgProfile !== null ? user.data().imgProfile : 'img/perfilblack.png';
        const divPostPublicated = document.createElement('div');
        divPostPublicated.setAttribute('class', 'container-publicated');
        divPostPublicated.innerHTML = `
        <div class="post-publicated">
          <div class="info-user">
            <div class="info-post">
              <div class="photo-perfil-post">
                <img src=${userImgProfile} alt="foto perfil de usuario">
              </div>
              <div class="nameuser-date">
                <span>${userName}</span> <br>
                <span>${datePostFormat}</span>
            </div>
            </div>
            <div>
              <i class="bi bi-three-dots hidden-btn"></i> 
              <ul class="cont-btns-edit-delete">
                <li><button type="button" class="btn-edit menu-three-dots">Editar</button></li>
                <li><button type="button" class="btn-delete menu-three-dots">Eliminar</button></li>
              </ul>
            </div>
          </div>
          <div class="input-readonly">
            <span id=${post.id} class="post-publicated cont-post" role="textbox">${post.data().post}</span>
            <div class="cont-btn-save">
            <button type="button" class="btn-save hidden-btn">Guardar</button>
          </div>
          </div>
        </div>
        <div class="container-like-comment">
          <div class="mando-img">
            <i class="bi bi-joystick"></i>
            <span class="span-counter">${post.data().likes.length}</span>
            <span class="span-text"> Me gusta </span>
          </div>
          <div class="comment-img">
            <i class="bi bi-chat-dots"></i>
            <span class="span-text"> Comentar </span>
          </div>
          <div id="modal-message-confirm-edit" class="modal">
            <div class="modal-cont">
              <h2>Twitchtter</h2>
              <p id="modal-edit">¿Estás seguro que deseas guardar los cambios?</p>
              <button type="button" id="btn-confirm-edit" class="btn-confirm-delete btn-general">Aceptar</button>
              <button type="button" id="btn-cancel-edit" class="btn-cancel-delete btn-general">Cancelar</button>
            </div>
          </div>
          <div id="modal-message-confirm-delete" class="modal">
            <div class="modal-cont">
              <h2>Twitchtter</h2>
              <p id="modal-delete">¿Estás seguro que quieres eliminar el post?</p>
              <button type="button" id="btn-confirm-delete" class="btn-confirm-delete btn-general">Aceptar</button>
              <button type="button" id="btn-cancel-delete" class="btn-cancel-delete btn-general">Cancelar</button>
            </div>
          </div>
        </div>`;

        containerPostPublicated.appendChild(divPostPublicated);
        // TRAEMOS LOS BOTONES DE ELIMINAR Y EDITAR LOS POST
        const btnDelete = divPostPublicated.querySelector('.btn-delete');
        const btnEdit = divPostPublicated.querySelector('.btn-edit');
        const btnSave = divPostPublicated.querySelector('.btn-save');
        const contentPost = document.getElementById(`${post.id}`);
        const btnLike = divPostPublicated.querySelector('.bi-joystick');
        const arrayLikes = post.data().likes;
        const modalEdit = document.querySelector('#modal-message-confirm-edit');
        const modalDelete = document.querySelector('#modal-message-confirm-delete');
        const btnModalConfirmEdit = document.getElementById('btn-confirm-edit');
        const btnModalCancelEdit = document.getElementById('btn-cancel-edit');
        const btnModalConfirmDelete = document.getElementById('btn-confirm-delete');
        const btnModalCancelDelete = document.getElementById('btn-cancel-delete');

        // EVENTO CLICK PARA DESPLEGAR EL MENU DE EDITAR Y ELIMINAR POST
        const threeDots = divPostPublicated.querySelector('.bi-three-dots');
        const contbtnsEditAndDelete = divPostPublicated.querySelector('.cont-btns-edit-delete');

        if (userData.uid === auth.currentUser.uid) {
          threeDots.classList.remove('hidden-btn');
        }
        threeDots.addEventListener('click', () => {
          console.log('aloooooooo?');
          contbtnsEditAndDelete.classList.toggle('three-dots-visible');
          btnSave.classList.add('hidden-btn');
          contentPost.setAttribute('contentEditable', 'false');
        });

        window.addEventListener('scroll', () => {
          contbtnsEditAndDelete.classList.remove('three-dots-visible');
        });

        if (arrayLikes.includes(auth.currentUser.uid)) {
          btnLike.classList.add('active-like');
        }

        btnLike.addEventListener('click', () => {
          if (arrayLikes.includes(auth.currentUser.uid)) {
            const filterUser = arrayLikes.filter((uidUser) => uidUser !== auth.currentUser.uid);
            editPost(post.id, { likes: filterUser });
          } else {
            editPost(post.id, { likes: [...arrayLikes, auth.currentUser.uid] });
          }
        });

        // EVENTO CLICK PARA ELIMINAR LOS POST
        const showModalDelete = () => {
          modalDelete.classList.add('modal-visible');
          contbtnsEditAndDelete.classList.toggle('three-dots-visible');

          btnModalConfirmDelete.addEventListener('click', () => {
            deletePost(post.id);
          });

          btnModalCancelDelete.addEventListener('click', () => {
            modalDelete.classList.remove('modal-visible');
          });
        };
        btnDelete.addEventListener('click', showModalDelete);

        // EVENTOS DE CLICK PARA EDITAR LOS POST
        btnEdit.addEventListener('click', () => {
          contbtnsEditAndDelete.classList.toggle('three-dots-visible');
          btnSave.classList.remove('hidden-btn');
          contentPost.setAttribute('contentEditable', 'true');
          contentPost.focus();
        });
        btnSave.addEventListener('click', () => {
          modalEdit.classList.add('modal-visible');

          btnModalConfirmEdit.addEventListener('click', () => {
            editPost(post.id, {
              post: contentPost.textContent,
            }).then(() => {
              contentPost.removeAttribute('contentEditable');
              btnSave.classList.add('hidden-btn');
              modalEdit.classList.remove('modal-visible');
            });
          });

          btnModalCancelEdit.addEventListener('click', () => {
            contentPost.removeAttribute('contentEditable');
            modalEdit.classList.remove('modal-visible');
            btnSave.classList.add('hidden-btn');
            contentPost.textContent = post.data().post;
          });
        });
      });
    });
};

export default (section) => {
  // DECLARACION DE CONSTANTES PARA MANEJO DEL DOM
  const btnSharePost = section.querySelector('#btn-share-post');
  // const containerPostPublicated = section.querySelector('.container-post');
  const inputPost = section.querySelector('#create-post');

  inputPost.addEventListener('click', () => {
    if (inputPost.textContent === '¿Qué quieres compartir, gamer?' || inputPost.textContent === 'Debes escribir algo en tu publicación') {
      inputPost.textContent = '';
    }
  });
  // EVENTO CLICK DEL BOTON COMPARTIR EL POST
  btnSharePost.addEventListener('click', () => {
    // METODO PARA OBTENER LA FECHA Y HORA EN LA QUE SE REALIZA EL POSTEO
    if (inputPost.textContent !== '' && inputPost.textContent !== '¿Qué quieres compartir, gamer?' && inputPost.textContent !== 'Debes escribir algo en tu publicación') {
      const datePostMs = new Date().getTime();
      createPost(
        auth.currentUser.uid,
        inputPost.textContent,
        datePostMs.toString(),
        'público',
        [],
      );
      inputPost.textContent = '¿Qué quieres compartir, gamer?';
    } else {
      inputPost.textContent = 'Debes escribir algo en tu publicación';
    }
  });

  // FUNCIÓN PARA MOSTRAR LOS POST
  getPost(querySnapshot);
};
