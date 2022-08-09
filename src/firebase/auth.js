/* eslint-disable import/no-unresolved */
import {
  getAuth, signInWithPopup, GoogleAuthProvider,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, sendEmailVerification,
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js';
import {
  getFirestore, setDoc, doc, addDoc, getDoc, collection, onSnapshot,
  orderBy, query, deleteDoc, updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js';
import { app } from './conection.js';

// Variable que nos conecta con la database de Firebase
export const db = getFirestore(app);

// Variable para obtener la autenciación de usuario
export const auth = getAuth();

// Variable del observador para saber si hay usuario logueado o no
export const stateUser = onAuthStateChanged;

// Variable para obtener autenticación con Google
const provider = new GoogleAuthProvider();

// Función para crear usuarios en Firebase con correo y contraseña
export const registerUserAuth = (email, pass) => createUserWithEmailAndPassword(auth, email, pass);

// Función para enviar email de verificación a los usuarios que se crean
export const sendEmailVerif = () => sendEmailVerification(auth.currentUser);

// Función para crear colección de usuarios en Firestore, con el ID de Firebase
export const registerUserFirestore = (email, name, nickname, uid, imgProfile) => {
  setDoc(doc(db, 'users', uid), {
    email,
    name,
    nickname,
    uid,
    imgProfile,
  });
};

// Función para autenciar usuarios con Google
export const authGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      registerUserFirestore(
        user.email,
        user.displayName,
        user.displayName,
        user.uid,
        user.photoURL,
      );
    });
};

// Función para loguear usuarios con correo y contraseña
export const logInWithEmailAndPass = (email, pass) => signInWithEmailAndPassword(auth, email, pass);

// Función para cerrar sesión de los usuarios logueados
export const logOut = () => {
  signOut(auth);
};

// Función para crear posts
export const createPost = (uid, post, datePost, state, likes) => {
  addDoc(collection(db, 'post'), {
    uid,
    post,
    datePost,
    state,
    likes,
  });
};

// Funcion para obtener informacion de los posts creados
export const getPost = (querySnapshot) => {
  const queryPost = query(collection(db, 'post'), orderBy('datePost', 'desc'));
  onSnapshot(queryPost, querySnapshot);
};

// Función para obtener al usuario al que pertenece cada post
export const getUser = (id) => getDoc(doc(db, 'users', id));

// Función para eliminar los posts
export const deletePost = (idPost) => deleteDoc(doc(db, 'post', idPost));

// Función para editar los posts
export const editPost = (idPost, updatePost) => updateDoc(doc(db, 'post', idPost), updatePost);
