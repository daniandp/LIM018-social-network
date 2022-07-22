/* eslint-disable import/no-unresolved */
import {
  getAuth, signInWithPopup, GoogleAuthProvider,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, sendEmailVerification,
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js';
import {
  getFirestore, setDoc, doc, addDoc, getDocs, collection, onSnapshot, orderBy, query, where,
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js';
import { app } from './conection.js';

export const db = getFirestore(app);
export const auth = getAuth();
export const stateUser = onAuthStateChanged;
const provider = new GoogleAuthProvider();

export const sendEmailVerif = () => sendEmailVerification(auth.currentUser);

export const registerUserFirestore = (email, name, nickname, uid) => {
  setDoc(doc(db, 'users', uid), {
    email,
    name,
    nickname,
    uid,
  });
};

export const authGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      const user = result.user;
      console.log(user);
      console.log(user.uid);
      registerUserFirestore(user.email, user.displayName, user.displayName, user.uid);
    }).catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

export const registerUserAuth = (email, pass) => createUserWithEmailAndPassword(auth, email, pass);

export const logInWithEmailAndPass = (email, pass) => signInWithEmailAndPassword(auth, email, pass);

export const createPost = (uid, post, datePost, state) => {
  addDoc(collection(db, 'post'), {
    uid,
    post,
    datePost,
    state,
  })
    .then((docRef) => {
      console.log('post creado', docRef);
    });
};

/* funcion para obtener informacion de los post */
export const getPost = (querySnapshot) => {
  const queryPost = query(collection(db, 'post'), orderBy('datePost', 'desc'));
  onSnapshot(queryPost, querySnapshot);
};

export const getUser = (querySnapshot) => {
  const queryUser = (collection(db, 'users'));
  console.log(queryUser);
  onSnapshot(queryUser, querySnapshot);
};

export const logOut = () => {
  signOut(auth).then(() => {
  }).catch((error) => {
    console.log(error);
  });
};
