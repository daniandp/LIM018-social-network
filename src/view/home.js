export default () => {
  const viewHome = `<section class="home-page">
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
          <a href=""><img class="game-over" src="img/gameover.png" alt="icono logout"></a>
        </li>
        <li class="version hidden">V.1.1</li>
        </ul>
      </nav>
    </header>
    <section class="container-main">
      <div class="container-input-post">
        <div>
          <textarea id="create-post" placeholder="¿Qué quieres compartir, gamer?"></textarea>
        </div>
        <div class="container-share-btn">
          <div class="share-img" >
          <i class="bi bi-image bi-size"></i>
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
          </div>
          </div>
          <div class="input-readonly">
            <textarea rows="" class="post-publicated" readonly>El usuario uno comparte su opinión o su comentario en esta sección holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</textarea>
          </div>
        </div>
        <div class="container-like-comment">
          <div class="mando-img">
            <i class="bi bi-joystick"></i>
          </div>
          <div class="comment-img">
            <i class="bi bi-chat-dots"></i>
          </div>
        </div>
      </div>
    </section>
  </section>`;
  return viewHome;
};
