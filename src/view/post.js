import {
  createPost, auth, getPost, getUser, deletePost, editPost,
} from '../firebase/auth.js';

export default (section) => {
  // DECLARACION DE CONSTANTES PARA MANEJO DEL DOM
  const btnSharePost = section.querySelector('#btn-share-post');
  const containerPostPublicated = section.querySelector('.container-post');
  const inputPost = section.querySelector('#create-post');

  inputPost.addEventListener('click', () => {
    if (inputPost.textContent === '¿Qué quieres compartir, gamer?' || inputPost.textContent === 'Debes escribir algo en tu publicación') {
      inputPost.textContent = '';
    }
  });
  // EVENTO CLICK DEL BOTON COMPARTIR EL POST
  btnSharePost.addEventListener('click', () => {
    // METODO PARA OBTENER LA FECHA Y HORA EN LA QUE SE REALIZA EL POSTEO
    if (inputPost.textContent !== '' && inputPost.textContent !== '¿Qué quieres compartir, gamer?' && inputPost.textContent !== 'Debes escribir algo en tu publicación') {
      const date = new Date();
      const datePost = `${(date.getDate()).toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
      createPost(
        auth.currentUser.uid,
        inputPost.textContent,
        datePost,
        'público',
        [],
      );
      inputPost.textContent = '¿Qué quieres compartir, gamer?';
    } else {
      inputPost.textContent = 'Debes escribir algo en tu publicación';
    }
  });

  // FUNCIÓN PARA MOSTRAR LOS POST
  const querySnapshot = (queryPost) => {
    containerPostPublicated.innerHTML = '';
    queryPost.forEach((post) => {
      // OBTENEMOS LA INFORMACIÓN DEL USUARIO DUEÑO DEL POST
      getUser(post.data().uid).then((user) => {
        const userData = user.data();
        const userName = userData.name;
        const divPostPublicated = document.createElement('div');
        divPostPublicated.setAttribute('class', 'container-publicated');
        divPostPublicated.innerHTML = `
       <div class='post-publicated'>
       <div class='info-user'>
         <div class='info-post'>
           <div class='photo-perfil-post'>
             <img src='img/perfilblack.png' alt='foto perfil de usuario'>
           </div>
           <div class='nameuser-date'>
             <span>${userName}</span> <br>
             <span>${post.data().datePost}</span>
           </div>
         </div>
         <div class='btn-edit-delete'>
           <i class='bi bi-three-dots'></i>
         </div>
       </div>
       <div class='input-readonly'>
         <span id=${post.id} class='post-publicated cont-post' role='textbox'>${post.data().post}</span>
       </div>
     </div>
     <div class='container-like-comment'>
       <div class='mando-img'>
         <i class='bi bi-joystick'></i>
         <span class='span-counter'>${post.data().likes.length}</span>
         <span class='span-text'> Me gusta </span>
       </div>
       <div class='comment-img'>
         <i class='bi bi-chat-dots'></i>
         <span class='span-text'> Comentar </span>
       </div>
       <div>
         <button type='button' class='btn-edit'>Editar</button> 
       </div>
       <div>
         <button type='button' class='btn-delete'>Eliminar</button> 
       </div>
       <div>
         <button type='button' class='btn-save'>Guardar</button> 
       </div>
       </div>`;

        containerPostPublicated.appendChild(divPostPublicated);

        // TRAEMOS LOS BOTONES DE ELIMINAR Y EDITAR LOS POST
        const btnDelete = divPostPublicated.querySelector('.btn-delete');
        const btnEdit = divPostPublicated.querySelector('.btn-edit');
        const btnSave = divPostPublicated.querySelector('.btn-save');
        const contentPost = document.getElementById(`${post.id}`);
        const btnLike = divPostPublicated.querySelector('.bi-joystick');
        const arrayLikes = post.data().likes;
        if (arrayLikes.includes(auth.currentUser.uid)) {
          btnLike.classList.add('active-like');
        }

        btnLike.addEventListener('click', () => {
          if (arrayLikes.includes(auth.currentUser.uid)) {
            const filterUser = arrayLikes.filter((uidUser) => uidUser !== auth.currentUser.uid);
            editPost(post.id, { likes: filterUser });
          } else {
            editPost(post.id, { likes: [...arrayLikes, auth.currentUser.uid] });
          }
        });
        // EVENTO CLICK PARA ELIMINAR LOS POST
        btnDelete.addEventListener('click', () => {
          const opcion = window.confirm('¿Estás seguro que deseas eliminar el post?');
          if (opcion === true) {
            deletePost(post.id).then(() => {
              console.log('post eliminado ', post.id);
            });
          } else {
            console.log('Eliminación cancelada');
          }
        });
        // EVENTOS DE CLICK PARA EDITAR LOS POST
        btnEdit.addEventListener('click', () => {
          contentPost.setAttribute('contentEditable', 'true');
          contentPost.focus();
        });
        btnSave.addEventListener('click', () => {
          const opcion = window.confirm('¿Estás seguro que deseas guardar los cambios?');
          if (opcion === true) {
            editPost(post.id, {
              post: contentPost.textContent,
            }).then(() => {
              contentPost.removeAttribute('contentEditable');
              console.log('post editado');
            });
          } else {
            console.log('Edición cancelada');
          }
        });
      });
    });
  };
  getPost(querySnapshot);
};
