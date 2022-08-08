import {
  createPost, auth, getPost, getUser, deletePost, editPost,
} from '../firebase/auth.js';

export default (section) => {
  // DECLARACION DE CONSTANTES PARA MANEJO DEL DOM
  const btnSharePost = section.querySelector('#btn-share-post');
  const containerPostPublicated = section.querySelector('.container-post');
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
  const querySnapshot = (queryPost) => {
    const arrPostsandUsers = []; // array que va a almacenar las promesas
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
            <div id="modal-message-confirm" class="modal">
              <div class="modal-cont">
                <h2>Twitchtter</h2>
                <p id="modal-question"></p>
                <button type="button" id="btn-confirm" class="btn-confirm-delete btn-general">Aceptar</button>
                <button type="button" id="btn-cancel" class="btn-cancel-delete btn-general">Cancelar</button>
              </div>
            </div>
            <div id="modal-small" class="msg-hidden"></div> 
          </div>`;

          containerPostPublicated.appendChild(divPostPublicated);
          // TRAEMOS LOS BOTONES DE ELIMINAR Y EDITAR LOS POST
          const btnDelete = divPostPublicated.querySelector('.btn-delete');
          const btnEdit = divPostPublicated.querySelector('.btn-edit');
          const btnSave = divPostPublicated.querySelector('.btn-save');
          const contentPost = document.getElementById(`${post.id}`);
          const btnLike = divPostPublicated.querySelector('.bi-joystick');
          const arrayLikes = post.data().likes;
          const modal = section.querySelector('#modal-message-confirm');
          const btnModalConfirm = document.getElementById('btn-confirm');
          const btnModalCancel = document.getElementById('btn-cancel');
          const modalQuestion = document.getElementById('modal-question');
          const modalSmall = document.getElementById('modal-small');

          // EVENTO CLICK PARA DESPLEGAR EL MENU DE EDITAR Y ELIMINAR POST
          const threeDots = divPostPublicated.querySelector('.bi-three-dots');
          const contbtnsEditAndDelete = divPostPublicated.querySelector('.cont-btns-edit-delete');

          if (userData.uid === auth.currentUser.uid) {
            threeDots.classList.remove('hidden-btn');
          }
          threeDots.addEventListener('click', () => {
            console.log('aloooooooo?');
            contbtnsEditAndDelete.classList.toggle('three-dots-visible');
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
          btnDelete.addEventListener('click', () => {
            modalQuestion.innerHTML = '¿Estás seguro que quieres eliminar el post?';
            modal.classList.add('modal-visible');
            // NO ESTÁ COMPLETO
            btnModalConfirm.addEventListener('click', () => {
              deletePost(post.id);
              modalSmall.classList.add('msg-visible');
              modalSmall.className = 'msg-visible';
              modalSmall.innerHTML = 'Post eliminado';
            });

            setTimeout(() => {
              modalSmall.classList.add('msg-hidden');
            }, 5000);

            btnModalCancel.addEventListener('click', () => {
              modal.classList.remove('modal-visible');
              modalSmall.classList.add('msg-visible');
              modalSmall.innerHTML = 'Eliminación cancelada';
            });
          });

          // EVENTOS DE CLICK PARA EDITAR LOS POST
          btnEdit.addEventListener('click', () => {
            contbtnsEditAndDelete.classList.toggle('three-dots-visible');
            btnSave.classList.toggle('hidden-btn');
            contentPost.setAttribute('contentEditable', 'true');
            contentPost.focus();
          });
          btnSave.addEventListener('click', () => {
            modalQuestion.innerHTML = '¿Estás seguro que deseas guardar los cambios?';
            modal.classList.add('modal-visible');

            btnModalConfirm.addEventListener('click', () => {
              editPost(post.id, {
                post: contentPost.textContent,
              }).then(() => {
                contentPost.removeAttribute('contentEditable');
                btnSave.classList.toggle('hidden-btn');
                modal.classList.remove('modal-visible');
                modalSmall.classList.remove('msg-hidden');
                modalSmall.classList.add('msg-visible');
                modalSmall.innerHTML = 'Post editado';
              });
            });

            btnModalCancel.addEventListener('click', () => {
              contentPost.removeAttribute('contentEditable');
              modal.classList.remove('modal-visible');
              btnSave.classList.toggle('hidden-btn');
              contentPost.textContent = post.data().post;
              modalSmall.classList.add('msg-visible');
              modalSmall.innerHTML = 'Edición cancelada';
            });
          });
        });
      });
  };
  getPost(querySnapshot);
};
