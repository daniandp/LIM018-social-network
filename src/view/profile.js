import { auth, getUser } from '../firebase/auth.js';

export default (divProfile) => {
  const infoUser = divProfile;
  getUser(auth.currentUser.uid)
    .then((user) => {
      let userName = user.data().name;
      const userImgProfile = user.data().imgProfile !== null ? user.data().imgProfile : 'img/perfilwhite.png';
      userName = userName.split(' ', 2).join(' ');
      const viewProfile = `
        <div class="img-card-profile">
          <img src=${userImgProfile} alt="imagen de perfil" referrerpolicy="no-referrer">
        </div>
        <div class="user-name">
          <h5>${userName}</h5>
        </div>
        <div class="user-info">
          <div class="about-user">
            <span class="about-me">Mis juegos favoritos son LOL y Fallguys</span>
          </div>
      </div>`;

      infoUser.innerHTML = viewProfile;
    });
};
