/* eslint-disable import/no-unresolved */
import {
  createPost, auth, getPost, getUser, deletePost,
} from '../firebase/auth.js';

export default () => {
  // CREACIÓN DEL TEMPLATE
  const viewHome = `
    <section class="container-profile">
      <div class="profile-card">
        <div class="img-card-profile">
          <img src="img/perfilwhite.png" alt="imagen de perfil">
        </div>
        <div class="user-name">
          <h5>${auth.currentUser.email}</h5>
        </div>
        <div class="user-info">
          <div class="about-user">
            <span class="about-me">Mis juegos favoritos son...</span>
          </div>
          <div class="more-info">
            <span class"more-about-me">Interacción</span>
          </div>
        </div>
      </div>
      <div class="info-dev">
        <span>Desarrolado por</span>
        <ul class="menu-info-dev">
          <li>
            <a href="https://github.com/OryChRamirez" title="Orayma Chacón"><i class="bi bi-github"></i></a>
          </li>
          <li>
            <a href="https://github.com/Bellasacc" title="Bella Aguirre"><i class="bi bi-github"></i></a>
          </li>
          <li>
            <a href="https://github.com/daniandp" title="Daniela Andrade"><i class="bi bi-github"></i></a>
          </li>
        </ul>
      </div>
    </section>
    <section class="container-main">
      <div class="container-input-post">
        <div class="cont-descriptions-post">
          <span class="span-text"> Crea una publicación</span>
          <span role="textbox" contenteditable id="create-post" placeholder="¿Qué quieres compartir, gamer?"></span>
        </div>
        <div class="container-share-btn">
          <div class="share-img" >
            <i class="bi bi-image bi-size"></i>
            <span class="span-text"> Agregar imagen</span>
          </div>
          <div>
          <input id="check-private" type="checkbox">
          Privado
          </div>
          <div class="share-post">
            <button type="button" id="btn-share-post">Publicar</button>
          </div>
        </div>
      </div>
      <h3 class="text-publications">PUBLICACIONES</h3>
      <div class="container-post"></div>
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

  const postDelete = (buttons) => {
    console.log(buttons);
  };

  for (let i = 0; i < [0, 1, 2].length; i++) {
    if (i === 0) {
      console.log(i);
      break;
    }
  }

  // FUNCIÓN PARA MOSTRAR LOS POST
  const querySnapshot = (query) => {
    containerPostPublicated.innerHTML = '';
    query.forEach((docs) => {
      const queryUser = (queryUsers) => {
        queryUsers.forEach((element) => {
          if (docs.data().uid === element.id) {
            const divPostPublicated = document.createElement('div');
            divPostPublicated.setAttribute('class', 'container-publicated');
            divPostPublicated.innerHTML = `
            <div class="post-publicated">
            <div class="info-user">
              <div class="info-post">
                <div class="photo-perfil-post">
                  <img src="img/perfilblack.png" alt="foto perfil de usuario">
                </div>
                <div class="nameuser-date">
                  <span>${(element.id === docs.data().uid) ? element.data().name : 'Usuario'}</span> <br>
                  <span>${docs.data().datePost}</span>
                </div>
              </div>
              <div class="btn-edit-delete">
                <i class="bi bi-three-dots"></i>
              </div>
            </div>
            <div class="input-readonly">
              <span id=${docs.id} class="post-publicated cont-post" role="textbox">${docs.data().post}</span>
            </div>
          </div>
          <div class="container-like-comment">
            <div class="mando-img">
              <i class="bi bi-joystick"></i>
              <span class="span-text"> Me gusta </span>
            </div>
            <div class="comment-img">
              <i class="bi bi-chat-dots"></i>
              <span class="span-text"> Comentar </span>
            </div>
            <div>
              <button type="button" class="btn-edit">Editar</button> 
            </div>
            <div>
              <button type="button" class="btn-delete">Eliminar</button>
            </div>
            </div>`;
            containerPostPublicated.appendChild(divPostPublicated);
          }
        });

        /*  console.log(containerPostPublicated.querySelectorAll('.container-publicated').length);
        console.log(query);
        console.log(Object.entries(query).length); */
        postDelete(containerPostPublicated);
        // if (containerPostPublicated.querySelectorAll('.container-publicated').length === 17)
      };
      getUser(queryUser);
    });
  };
  getPost(querySnapshot);

  // DECLARACIÓN DE LOS BOTONES ELIMINAR Y EDITAR
  containerPostPublicated.addEventListener('click', (e) => {
    const btnDeletePost = containerPostPublicated.querySelectorAll('.btn-delete');
    console.log(e.target);
    console.log(btnDeletePost);
  });
  // const btnEditPost = containerPostPublicated.querySelectorAll('.btn-edit');

  // FUNCIÓN PARA ELIMINAR LOS POST
  // deletePost();
  return section; // RETORNA EL NODO DE LA SECCION DE HOME
};
