/* eslint-disable import/no-unresolved */
import { logOut } from '../firebase/auth.js';

// FUNCIÓN PARA IR A ARRIBA
export const scrollUp = () => {
  window.scrollTo(0, 0);
};

export default () => {
  // CREACIÓN DEL TEMPLATE
  const viewHeader = `
    <header>
      <nav class="nav-menu">
        <ul class="menu-left">
          <li>
            <a href="#"><img class="img-profile" src="img/perfilwhite.png" alt="perfil"></a>
          </li>
          <li class="hidden go-top" >
            <i class="bi bi-chevron-double-up" id="arrowTop"></i>
            <span> Ir a arriba</span>
          </li>
          <li class="title-home">TWITCHTTER</li>
        </ul>
        <ul class="menu-right">
        <li class="search-bar hidden">
          <input type="search" id="searchBar" placeholder=" Buscar en Twitchtter">
        </li>
        <li>
          <button type="button" class="nav-toggle"><i class="bi bi-list"></i></button>
          <ul class="nav-options">
            <li class="nav-options-item"><a href="" class="nav-options-link">Ir a home</a></li>
            <li class="nav-options-item"><a href="" class="nav-options-link">Ir a perfil</a></li>
            <li class="nav-options-item" id="logOut"><a href="" class="nav-options-link">Cerrar sesión</a></li>
          </ul>
        </li>
        <li class="version-page hidden">V.1.1</li>
        </ul>
      </nav>
    </header>`;

  // CREANDO NODO SECTION
  const section = document.createElement('section');
  section.setAttribute('class', 'header-page');
  section.innerHTML = viewHeader;
  const btnLogout = section.querySelector('#logOut');

  // TRAEMOS AL BOTÓN DE IR A ARRIBA DEL HEADER
  const arrowTop = section.querySelector('#arrowTop');

  // TRAEMOS AL BOTÓN DEL MENÚ DEL HEADER
  const menuHeader = section.querySelector('.nav-toggle');
  const navOptions = section.querySelector('.nav-options');

  // EVENTO CLICK DE LA FLECHA IR A ARRIBA
  arrowTop.addEventListener('click', scrollUp);
  // EVENTO CLICK PARA DESPLEGAR EL MENÚ
  menuHeader.addEventListener('click', () => {
    navOptions.classList.toggle('nav-options_visible');
  });

  // EVENTO CLICK DEL BOTON LOGOUT
  btnLogout.addEventListener('click', logOut);

  return section; // RETORNA EL NODO DE LA SECCION DE HOME
};
