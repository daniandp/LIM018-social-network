/* eslint-disable max-len */
import {
  authGoogle, registerUserAuth,
  registerUserFirestore, sendEmailVerif,
} from '../firebase/auth.js';

export const validateEmail = (inputMail, error) => {
  const msgError = error;
  const condition = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const stateCondition = condition.test(inputMail);
  if (!stateCondition) {
    msgError.innerHTML = 'Debes ingresar un email válido: ejemplo@dominio.com';
    msgError.classList.add('background-message-error');
  } else {
    msgError.innerHTML = '';
    msgError.classList.remove('background-message-error');
  }
};

export default () => {
  // CREACIÓN DEL TEMPLATE
  const viewRegister = `<div class="cont-title">
  <h1 class="title focus-in-contract">TWITCHTTER</h1>
  <div class="cont-logo">
  <img src="./img/mandoneon.png" class="logo hidden vibrate-3" alt="logoTwitchtter">
  </div>
  <h2 class="slogan hidden main-slogan">¡La red social creada por gamers para gamers!</h2>
  </div>
  <div class="cont-form">
    <form class="form-register">
      <h3 class="slogan slogan-register">Registrate y forma parte de la comunidad</h3>
      <button type="button" class="btn-google btn-general"><img class="google-icon" src="./img/googleicon.png" alt="google icon">
        Iniciar sesión con google</button>
      <div class="separator"><hr class="hr">O<hr class="hr"></div>
      <div class="cont-inputs-register">
        <input id="email" class="input-register" type="email" placeholder="Correo electrónico">
        <input id="name" class="input-register" type="text" placeholder="Nombre completo">
        <input id="nickname" class="input-register" type="text" placeholder="Nombre de usuario">
        <input id="password" class="input-register" type="password" placeholder="Contraseña">
      </div>
      <button type="button" class="btn-enter btn-general">Registrar</button>
      <p id="message-error"></p>
      <div class="links-redirect">¿Ya eres miembro? <a class="links-redirect" href="#/login">Inicia sesión ahora</a></div>
    </form>
  </div>
  <div id="modal-message" class="modal">
    <div class="modal-cont">
      <h2>Verifica tu correo</h2>
      <p>Te hemos enviado un correo electrónico, verificalo e inicia sesión</p>
      <button type="button" class="btn-redirect btn-general">Ir a Iniciar Sesión</button>
    </div> 
  </div>`;

  // CREANDO NODO SECTION
  const section = document.createElement('section');
  section.setAttribute('class', 'screen-register');
  section.innerHTML = viewRegister;

  // DECLARACION DE CONSTANTES PARA MANEJO DEL DOM
  const inputMail = section.querySelector('#email');
  const inputName = section.querySelector('#name');
  const inputNickname = section.querySelector('#nickname');
  const inputPassword = section.querySelector('#password');
  const msgError = section.querySelector('#message-error');
  const btnGoogle = section.querySelector('.btn-google');
  const btnRegister = section.querySelector('.btn-enter');
  const modal = section.querySelector('#modal-message');
  const btnModal = section.querySelector('.btn-redirect');

  // EVENTO CAMBIO DE INPUT EN EL FORMULARIO DE REGISTRO
  inputMail.addEventListener('change', () => validateEmail(inputMail.value, msgError));

  // EVENTO CLICK DEL BOTON REGISTRAR
  btnRegister.addEventListener('click', () => {
    if (inputMail.value !== '' && inputName.value !== '' && inputNickname.value !== '' && inputPassword.value !== '') {
      msgError.innerHTML = '';
      msgError.classList.remove('background-message-error');
      registerUserAuth(inputMail.value, inputPassword.value)
        .then((userCredential) => {
          // console.log(userCredential);
          // Signed in
          const user = userCredential.user;
          // console.log(user);
          registerUserFirestore(
            inputMail.value,
            inputName.value,
            inputNickname.value,
            user.uid,
            user.photoURL,
          );
          // ...
          sendEmailVerif();
          modal.classList.add('modal-visible');
        })
        .catch((error) => {
          const errorMessage = error.message;
          msgError.classList.add('background-message-error');
          // CONTROL DE ERRORES PARA MOSTRAR EN EL DOM
          switch (errorMessage) {
            case 'Firebase: Error (auth/email-already-in-use).': {
              msgError.innerHTML = 'El correo ya se encuentra registrado';
              break;
            }
            case 'Firebase: Password should be at least 6 characters (auth/weak-password).': {
              msgError.innerHTML = 'La contraseña debe tener al menos 6 caracteres';
              break;
            }
            case 'Firebase: Error (auth/invalid-email).': {
              msgError.innerHTML = 'Debes ingresar un email válido: ejemplo@dominio.com';
              break;
            }
            default: msgError.innerHTML = 'Error no verificado';
              break;
          }
        });
    } else {
      msgError.innerHTML = 'Debes completar todos los campos para continuar';
      msgError.classList.add('background-message-error');
    }
  });

  // EVENTO CLICK DEL BOTON DE VENTANA MODAL
  btnModal.addEventListener('click', () => {
    window.location.hash = '#/login';
  });

  // EVENTO CLICK DEL BOTON DE INICIO SESION CON GOOGLE
  btnGoogle.addEventListener('click', authGoogle);
  return section; // RETORNA EL NODO DE LA SECCION DE REGISTRO
};
