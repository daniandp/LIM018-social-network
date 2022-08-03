export default () => {
  // CREACIÓN DE TEMPLATE
  const viewWelcome = `<h1 class="title focus-in-contract">TWITCHTTER</h1>
  <div class="cont-logo">
  <img class="logo rotate-scale-up-diag-1" src="./img/mandoneon.png" alt="logoTwitchtter">
  </div>
  <h2 class="slogan slogan-welcome">¡La red social creada por gamers para gamers!</h2>
  <div class="group-btn">
  <a href="#/login"><button class="btn-login btn-general" type="button" id="logIn">Iniciar sesión</button></a>
  <a href="#/register"><button class="btn-singup btn-general" type="button" id="singUp">Registrarse</button></a>
  </div>`;

  // CREANDO NODO SECTION
  const section = document.createElement('section');
  section.setAttribute('class', 'screen-welcome');
  section.innerHTML = viewWelcome;

  return section; // RETORNA EL NODO DE LA SECCION DE BIENVENIDA
};
