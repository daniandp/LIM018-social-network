/* eslint-disable import/no-unresolved */
import {
  collection, onSnapshot,
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js';
import {
  logOut, createPost, auth, db,
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
          <h5>USUARIO</h5>
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
          <div class="share-post">
            <button type="button" id="btn-share-post">Publicar</button>
          </div>
        </div>
      </div>
      <div class="container-publicated">
        <div class="post-publicated">
          <div class="info-user">
            <div class="info-post">
              <div class="photo-perfil-post">
                <img src="img/perfilblack.png" alt="foto perfil de usuario">
              </div>
              <div class="nameuser-date">
                <span>Usuario 1</span> <br>
                <span>11/07/2022</span>
              </div>
            </div>
            <div class="btn-edit-delete">
              <i class="bi bi-three-dots"></i>
            </div>
          </div>
          <div class="input-readonly">
            <span class="post-publicated cont-post" role="textbox"> El usuario uno comparte su opinión o su comentario en esta sección holaa hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola hola</span>
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
        </div>
      </div>
    </section>`;

  // CREANDO NODO SECTION
  const section = document.createElement('section');
  section.setAttribute('class', 'home-page');
  section.innerHTML = viewHome;
  const btnSharePost = section.querySelector('#btn-share-post');

  // METODO PARA OBTENER LA FECHA EN LA QUE SE REALIZA EL POSTEO
  const date = new Date();
  const datePost = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

  // EVENTO CLICK DEL BOTON COMPARTIR EL POST
  btnSharePost.addEventListener('click', () => {
    createPost(
      auth.currentUser.uid,
      section.querySelector('#create-post').value,
      datePost,
      'público',
    );
  });
  // getPost();

  /* funcion para obtener informacion de los post */
  const getPost = () => {
    const queryPost = (collection(db, 'post'));
    onSnapshot(queryPost, (querySnapshot) => {
      querySnapshot.forEach((post) => {
        const divPost = document.createElement('div');
        divPost.innerHTML = (post.data());
      });
    });
  };
  return section; // RETORNA EL NODO DE LA SECCION DE HOME
};
