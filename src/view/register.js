export default () => {
  const viewRegister = `<div class="cont-title">
  <h1 class="title">TWITCHTTER</h1>
  <img src="./img/mando.png" class="logo hidden" alt="logoTwitchtter">
  <h2 class="slogan hidden">¡La red social creada por gamers para gamers!</h2>
  </div>
  <div class="cont-form">
    <form class="form-register">
      <h3 class="slogan slogan-register">Registrate y forma parte de la comunidad</h3>
      <button class="btn-google btn-general"><img class="google-icon" src="./img/googleicon.png" alt="google icon">
        Iniciar sesión con google</button>
      <div class="separator"><hr class="hr">O<hr class="hr"></div>
      <div class="cont-inputs-register">
        <input class="input-register" type="text" placeholder="Correo electrónico">
        <input class="input-register" type="text" placeholder="Nombre completo">
        <input class="input-register" type="text" placeholder="Nombre de usuario">
        <input class="input-register" type="password" placeholder="Contraseña">
      </div>
      <a href="#"><button type="button" class="btn-enter btn-general">Registrar</button></a>
      <div class="links-redirect">¿Ya eres miembro? <a class="links-redirect" href="#">Inicia sesión ahora</a></div>
    </form>
  </div>`;

  return viewRegister;
};
