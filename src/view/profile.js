import { auth, getUser } from '../firebase/auth.js';

export default (divProfile) => {
  const infoUser = divProfile;
  getUser(auth.currentUser.uid)
    .then((user) => {
      let userName = user.data().name;
      userName = userName.split(' ', 2).join(' ');
      const viewProfile = `<div class="img-card-profile">
          <img src="img/perfilwhite.png" alt="imagen de perfil">
        </div>
        <div class="user-name">
          <h5>${userName}</h5>
        </div>
        <div class="user-info">
          <div class="about-user">
            <span class="about-me">Mis juegos favoritos son...</span>
          </div>
          <div class="more-info">
            <span class"more-about-me">Interacción</span>
          </div>
      </div>`;

      infoUser.innerHTML = viewProfile;
    });
};
