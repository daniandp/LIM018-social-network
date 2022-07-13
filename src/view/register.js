import {
  authGoogle, registerUserWithEmailAndPassword,
} from '../firebase/auth.js';

export default () => {
  const viewRegister = `<div class="cont-title">
  <h1 class="title">TWITCHTTER</h1>
  <div class="cont-logo">
  <img src="./img/mando.png" class="logo hidden" alt="logoTwitchtter">
  </div>
  <h2 class="slogan hidden main-slogan">¡La red social creada por gamers para gamers!</h2>
  </div>
  <div class="cont-form">
    <form class="form-register">
      <h3 class="slogan slogan-register">Registrate y forma parte de la comunidad</h3>
      <button class="btn-google btn-general"><img class="google-icon" src="./img/googleicon.png" alt="google icon">
        Iniciar sesión con google</button>
      <div class="separator"><hr class="hr">O<hr class="hr"></div>
      <div class="cont-inputs-register">
        <input id="email" class="input-register" type="text" placeholder="Correo electrónico">
        <input id="name" class="input-register" type="text" placeholder="Nombre completo">
        <input id="nickname" class="input-register" type="text" placeholder="Nombre de usuario">
        <input id="password" class="input-register" type="password" placeholder="Contraseña">
      </div>
      <a href="#"><button type="button" class="btn-enter btn-general">Registrar</button></a>
      <div class="links-redirect">¿Ya eres miembro? <a class="links-redirect" href="#/login">Inicia sesión ahora</a></div>
    </form>
  </div>`;
  const section = document.createElement('section');
  section.setAttribute('class', 'screen-register');
  section.innerHTML = viewRegister;
  const btnGoogle = section.querySelector('.btn-google');
  const btnRegister = section.querySelector('.btn-enter');
  btnRegister.addEventListener('click', () => {
    registerUserWithEmailAndPassword(
      section.querySelector('#email').value,
      section.querySelector('#name').value,
      section.querySelector('#nickname').value,
      section.querySelector('#password').value,
    );
  });
  btnGoogle.addEventListener('click', authGoogle);
  return section;
};
