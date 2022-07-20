/* eslint-disable import/no-unresolved */
import {
  getAuth, signInWithPopup, GoogleAuthProvider,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, sendEmailVerification,
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js';
import {
  getFirestore, setDoc, doc, addDoc, collection, onSnapshot,
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
  /* .catch((error) => {
      console.error('Error adding document: ', error);
    });  */
};

/*  getDocs(collection(db, 'post'))
    .then((querySnapshot) => {
      console.log(querySnapshot);
      querySnapshot.forEach((elementPost) => {
        console.log(`${elementPost.id} => ${elementPost.data().datePost}`);
      });
    }); */

export const logOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    // currentUser();
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
};
