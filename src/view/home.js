export default () => {
  const viewHome = `<section class="home-page">
    <header>
      <nav>
        <ul class="menu-left">
          <li>
            <a href=""><img class="img-profile" src="img/perfiltwitchtter.png"/>><a>
          </li>
          <li>
            <a href=""><img class="img-top hidden" src="img/top.png"/><a>
          </li>
          <li class="title-home">TWITCHTTER</li>
          <li class="mentions hidden">
            <a href="">MENCIONES</a>
          </li>
        </ul>
        <ul class="menu-right">
        <li class="search-bar hidden">
          <input type="search" id="searchBar" placeholder="Buscar en Twitchtter" />
        </li>
        <li>
          <a href=""><img class="game-over" src="img/gameover.png"/>><a>
        </li>
        <li class="version hidden">V.1.1</li>
        </ul>
      </nav>
    </header>
      <a href="#/login"><button type="button" class="btn-logOut btn-general">Salir</button></a>
  </section>`;
  return viewHome;
};
