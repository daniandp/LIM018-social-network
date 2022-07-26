/* eslint-disable import/no-unresolved */
import {
  createPost, auth, getPost, getUser, deletePost, editPost,
} from '../firebase/auth.js';

export default () => {
  // CREACIÓN DEL TEMPLATE
  const viewHome = `
    <section class='container-profile'>
      <div class='profile-card'>
        <div class='img-card-profile'>
          <img src='img/perfilwhite.png' alt='imagen de perfil'>
        </div>
        <div class='user-name'>
          <h5>${auth.currentUser.email}</h5>
        </div>
        <div class='user-info'>
          <div class='about-user'>
            <span class='about-me'>Mis juegos favoritos son...</span>
          </div>
          <div class='more-info'>
            <span class'more-about-me'>Interacción</span>
          </div>
        </div>
      </div>
      <div class='info-dev'>
        <span>Desarrolado por</span>
        <ul class='menu-info-dev'>
          <li>
            <a href='https://github.com/OryChRamirez' title='Orayma Chacón'><i class='bi bi-github'></i></a>
          </li>
          <li>
            <a href='https://github.com/Bellasacc' title='Bella Aguirre'><i class='bi bi-github'></i></a>
          </li>
          <li>
            <a href='https://github.com/daniandp' title='Daniela Andrade'><i class='bi bi-github'></i></a>
          </li>
        </ul>
      </div>
    </section>
    <section class='container-main'>
      <div class='container-input-post'>
        <div class='cont-descriptions-post'>
          <span class='span-text'> Crea una publicación</span>
          <span role='textbox' contenteditable id='create-post' placeholder='¿Qué quieres compartir, gamer?'></span>
        </div>
        <div class='container-share-btn'>
          <div class='share-img' >
            <i class='bi bi-image bi-size'></i>
            <span class='span-text'> Agregar imagen</span>
          </div>
          <div>
          <input id='check-private' type='checkbox'>
          Privado
          </div>
          <div class='share-post'>
            <button type='button' id='btn-share-post'>Publicar</button>
          </div>
        </div>
      </div>
      <h3 class='text-publications'>PUBLICACIONES</h3>
      <div class='container-post'></div>
    </section>`;

  // CREANDO NODO SECTION
  const section = document.createElement('section');
  section.setAttribute('class', 'home-page');
  section.innerHTML = viewHome;

  // DECLARACION DE CONSTANTES PARA MANEJO DEL DOM
  const btnSharePost = section.querySelector('#btn-share-post');
  const containerPostPublicated = section.querySelector('.container-post');

  // EVENTO CLICK DEL BOTON COMPARTIR EL POST
  btnSharePost.addEventListener('click', () => {
    // METODO PARA OBTENER LA FECHA Y HORA EN LA QUE SE REALIZA EL POSTEO
    const date = new Date();
    const datePost = `${(date.getDate()).toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    createPost(
      auth.currentUser.uid,
      section.querySelector('#create-post').textContent,
      datePost,
      'público',
    );
    section.querySelector('#create-post').textContent = '';
  });

  // FUNCIÓN PARA MOSTRAR LOS POST
  const querySnapshot = (queryPost) => {
    containerPostPublicated.innerHTML = '';
    queryPost.forEach((post) => {
      // OBTENEMOS LA INFORMACIÓN DEL USUARIO DUEÑO DEL POST
      getUser(post.data().uid).then((user) => {
        const userData = user.data();
        const userName = userData.name;
        const divPostPublicated = document.createElement('div');
        divPostPublicated.setAttribute('class', 'container-publicated');
        divPostPublicated.innerHTML = `
        <div class='post-publicated'>
        <div class='info-user'>
          <div class='info-post'>
            <div class='photo-perfil-post'>
              <img src='img/perfilblack.png' alt='foto perfil de usuario'>
            </div>
            <div class='nameuser-date'>
              <span>${userName}</span> <br>
              <span>${post.data().datePost}</span>
            </div>
          </div>
          <div class='btn-edit-delete'>
            <i class='bi bi-three-dots'></i>
          </div>
        </div>
        <div class='input-readonly'>
          <span id=${post.id} class='post-publicated cont-post' role='textbox'>${post.data().post}</span>
        </div>
      </div>
      <div class='container-like-comment'>
        <div class='mando-img'>
          <i class='bi bi-joystick'></i>
          <span class='span-text'> Me gusta </span>
        </div>
        <div class='comment-img'>
          <i class='bi bi-chat-dots'></i>
          <span class='span-text'> Comentar </span>
        </div>
        <div>
          <button type='button' class='btn-edit'>Editar</button> 
        </div>
        <div>
          <button type='button' class='btn-delete'>Eliminar</button> 
        </div>
        <div>
          <button type='button' class='btn-save'>Guardar</button> 
        </div>
        </div>`;

        containerPostPublicated.appendChild(divPostPublicated);

        // TRAEMOS LOS BOTONES DE ELIMINAR Y EDITAR LOS POST
        const btnDelete = divPostPublicated.querySelector('.btn-delete');
        const btnEdit = divPostPublicated.querySelector('.btn-edit');
        const btnSave = divPostPublicated.querySelector('.btn-save');
        const contentPost = document.getElementById(`${post.id}`);

        // EVENTO CLICK PARA ELIMINAR LOS POST
        btnDelete.addEventListener('click', () => {
          const opcion = window.confirm('¿Estás seguro que deseas eliminar el post?');
          if (opcion === true) {
            deletePost(post.id).then(() => {
              console.log('post eliminado ', post.id);
            });
          } else {
            console.log('Eliminación cancelada');
          }
        });
        // EVENTOS DE CLICK PARA EDITAR LOS POST
        btnEdit.addEventListener('click', () => {
          contentPost.setAttribute('contentEditable', 'true');
          contentPost.focus();
        });
        btnSave.addEventListener('click', () => {
          const opcion = window.confirm('¿Estás seguro que deseas guardar los cambios?');
          if (opcion === true) {
            editPost(post.id, {
              post: contentPost.textContent,
            }).then(() => {
              contentPost.removeAttribute('contentEditable');
              console.log('post editado');
            });
          } else {
            console.log('Edición cancelada');
          }
        });
      });
    });
  };
  getPost(querySnapshot);

  return section; // RETORNA EL NODO DE LA SECCION DE HOME
};
