export default () => {
  const viewLogin = `<div class="cont-title">
  <h1 class="title">TWITCHTTER</h1>  
  <div class="cont-logo">
  <img src="./img/mando.png" class="logo hidden" alt="logoTwitchtter">
  </div>
  <h2 class="slogan hidden main-slogan">¡La red social creada por gamers para gamers!</h2>
  </div>
  <div class="cont-form">
  <form class="form-login">
  <h2 class="slogan slogan-desktop">¡Bienvenido gamer!</h2>
  <div class="cont-inputs-login">
    <input class="input-login" id="user-email" type="text" placeholder="Correo de usuario">
    <input class="input-login" id="user-password"  type="password" placeholder="Contraseña">
    <a class="links-redirect" href="#">¿Olvidaste tu contraseña?</a>
  </div>
    <a href="#/home"><button type="button" class="btn-enter btn-general">Entrar</button></a>
  <div class="separator">
    <hr class="hr">O<hr class="hr">
  </div>
    <button type="button" class="btn-google btn-general"><img class="google-icon" src="./img/googleicon.png" alt="google icon"> Iniciar sesión con google</button>
  <div class="links-redirect">¿No eres miembro? <a class="links-redirect" href="#/register">Regístrate ahora</a></div>
  </form>
  </div>`;

  return viewLogin;
};
