export const divPostPublicated = `
          <div class="post-publicated">
            <div class="info-user">
              <div class="info-post">
                <div class="photo-perfil-post">
                  <img src= "img/perfilblack.png" alt="foto perfil de usuario">
                </div>
                <div class="nameuser-date">
                  <span>La Rosalia</span> <br>
                  <span>05/08/2022 22:29:30</span>
              </div>
              </div>
              <div>
                <i class="bi bi-three-dots hidden-btn"></i> 
                <ul class="cont-btns-edit-delete">
                  <li><button type="button" class="btn-edit menu-three-dots">Editar</button></li>
                  <li><button type="button" class="btn-delete menu-three-dots">Eliminar</button></li>
                </ul>
              </div>
            </div>
            <div class="input-readonly">
              <span id= "12345678" class="post-publicated cont-post" role="textbox">Hola Mundo</span>
              <div class="cont-btn-save">
              <button type="button" class="btn-save hidden-btn">Guardar</button>
            </div>
            </div>
          </div>
          <div class="container-like-comment">
            <div class="mando-img">
              <i class="bi bi-joystick"></i>
              <span class="span-counter">1</span>
              <span class="span-text"> Me gusta </span>
            </div>
            <div class="comment-img">
              <i class="bi bi-chat-dots"></i>
              <span class="span-text"> Comentar </span>
            </div>
            <div id="modal-message-confirm-edit" class="modal">
              <div class="modal-cont">
                <h2>Twitchtter</h2>
                <p id="modal-edit">¿Estás seguro que deseas guardar los cambios?</p>
                <button type="button" id="btn-confirm-edit" class="btn-confirm-delete btn-general">Aceptar</button>
                <button type="button" id="btn-cancel-edit" class="btn-cancel-delete btn-general">Cancelar</button>
              </div>
            </div>
            <div id="modal-message-confirm-delete" class="modal">
              <div class="modal-cont">
                <h2>Twitchtter</h2>
                <p id="modal-delete">¿Estás seguro que quieres eliminar el post?</p>
                <button type="button" id="btn-confirm-delete" class="btn-confirm-delete btn-general">Aceptar</button>
                <button type="button" id="btn-cancel-delete" class="btn-cancel-delete btn-general">Cancelar</button>
              </div>
            </div>
          </div>`;
