/* eslint-disable import/no-unresolved */
import viewPost from './post.js';
import viewProfile from './profile.js';

export default () => {
  // CREACIÓN DEL TEMPLATE
  const viewHome = `
    <section class="container-profile">
      <div class="profile-card">
      </div>
      <div class="info-dev">
        <span>Desarrollado por</span>
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
          <span role="textbox" contenteditable id="create-post">¿Qué quieres compartir, gamer?</span>
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
  const divProfile = section.querySelector('.profile-card');

  viewProfile(divProfile);
  viewPost(section);

  return section; // RETORNA EL NODO DE LA SECCION DE HOME
};
