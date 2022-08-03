import {
  authGoogle, logInWithEmailAndPass,
} from '../firebase/auth.js';

export default () => {
  // CREACIÓN DEL TEMPLATE
  const viewLogin = `<div class="cont-title">
  <h1 class="title focus-in-contract">TWITCHTTER</h1>  
  <div class="cont-logo">
  <img src="./img/mandoneon.png" class="logo hidden vibrate-3" alt="logoTwitchtter">
  </div>
  <h2 class="slogan hidden main-slogan">¡La red social creada por gamers para gamers!</h2>
  </div>
  <div class="cont-form">
  <form class="form-login">
  <h2 class="slogan slogan-desktop">¡Bienvenido gamer!</h2>
  <div class="cont-inputs-login">
    <input class="input-login" id="user-email" type="email" placeholder="Correo de usuario">
    <input class="input-login" id="user-password"  type="password" placeholder="Contraseña">
    <a class="links-redirect" href="#">¿Olvidaste tu contraseña?</a>
  </div>
    <button type="button" class="btn-enter btn-general">Entrar</button>
    <p id="message-error"></p>
  <div class="separator">
    <hr class="hr">O<hr class="hr">
  </div>
  <button type="button" class="btn-google btn-general"><img class="google-icon" src="./img/googleicon.png" alt="google icon"> Iniciar sesión con google</button>
  <div class="links-redirect">¿No eres miembro? <a class="links-redirect" href="#/register">Regístrate ahora</a></div>
  </form>
  </div>`;

  // CREANDO NODO SECTION
  const section = document.createElement('section');
  section.setAttribute('class', 'screen-login');
  section.innerHTML = viewLogin;

  // DECLARACION DE CONSTANTES PARA MANEJO DEL DOM
  const msgError = section.querySelector('#message-error');
  const email = section.querySelector('#user-email');
  const password = section.querySelector('#user-password');
  const btnGoogle = section.querySelector('.btn-google');
  const btnEnter = section.querySelector('.btn-enter');

  // EVENTO CLICK DEL BOTON ENTRAR
  btnEnter.addEventListener('click', (e) => {
    e.preventDefault();
    if (email.value !== '' && password.value !== '') {
      msgError.innerHTML = '';
      msgError.classList.remove('background-message-error');
      // PROMESA DEL LOGIN PARA VALIDACION DE CREDENCIALES
      logInWithEmailAndPass(email.value, password.value).then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          msgError.innerText = '';
          window.location.hash = '#/home';
        } else {
          msgError.innerText = 'El usuario no se encuentra verificado';
          msgError.classList.add('background-message-error');
        }
      })
        .catch((error) => {
          const errorMessage = error.message;
          msgError.classList.add('background-message-error');
          // CONTROL DE ERRORES PARA MOSTRAR EN EL DOM
          switch (errorMessage) {
            case 'Firebase: Error (auth/user-not-found).': {
              msgError.innerHTML = 'Usuario no encontrado';
              break;
            }
            case 'Firebase: Error (auth/wrong-password).': {
              msgError.innerHTML = 'Contraseña incorrecta';
              break;
            }
            // Este es para el error Firebase: Error (auth/invalid-email). Email inválido.
            default: msgError.innerHTML = 'Email inválido';
              break;
          }
        });
    } else {
      msgError.innerHTML = 'Debes completar todos los campos para continuar';
      msgError.classList.add('background-message-error');
    }
  });

  // EVENTO CLICK DEL BOTON DE INICIO SESION CON GOOGLE
  btnGoogle.addEventListener('click', authGoogle);

  return section; // RETORNA EL NODO DE LA SECCION DE LOGUEO
};
