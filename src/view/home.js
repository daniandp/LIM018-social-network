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
    <header>
      <nav class="nav-menu">
        <ul class="menu-left">
          <li>
            <a href="#"><img class="img-profile" src="img/perfiltwitchtter.png" alt="perfil"></a>
          </li>
          <li class="hidden" >
            <a href=""><img class="img-top" src="img/top.png" alt="ir arriba"></a>
          </li>
          <li class="title-home">TWITCHTTER</li>
          <li class="mentions hidden">
            <a href="">MENCIONES</a>
          </li>
        </ul>
        <ul class="menu-right">
        <li class="search-bar hidden">
          <input type="search" id="searchBar" placeholder="Buscar en Twitchtter">
        </li>
        <li>
          <button type="button" class="nav-toggle"><i class="bi bi-list"></i></button>
          <ul class="nav-options">
            <li class="nav-options-item"><a href="" class="nav-options-link">Ir a home</a></li>
            <li class="nav-options-item"><a href="" class="nav-options-link">Ir a perfil</a></li>
            <li class="nav-options-item" id="logOut"><a href="" class="nav-options-link">Cerrar sesión</a></li>
          </ul>
        </li>
        <li class="version hidden">V.1.1</li>
        </ul>
      </nav>
    </header>
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
  const btnLogout = section.querySelector('#logOut');

  // EVENTO CLICK DEL BOTON LOGOUT
  btnLogout.addEventListener('click', logOut);

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
