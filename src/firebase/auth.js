/* eslint-disable import/no-unresolved */
import {
  getAuth, signInWithPopup, GoogleAuthProvider,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js';
import { getFirestore, setDoc, doc /* collection, addDoc, getDocs */ } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js';
import { app } from './conection.js';

const db = getFirestore(app);
export const auth = getAuth();
const provider = new GoogleAuthProvider();

export const registerUser = (email, name, nickname, uid) => {
  setDoc(doc(db, 'users', uid), {
    email,
    name,
    nickname,
    uid,
  });
  /*  .then((docRef) => {
      console.log('usuario logueado', docRef);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    }); */
};

export const currentUser = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const currUser = user.email;
      console.log('Usuario logueado', currUser);

      // ...
    } else {
      // User is signed out
      console.log('No hay usuario logueado');
      // ...
    }
  });
};

export const authGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      currentUser();
      console.log(token);
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      console.log(user.uid);
      registerUser(user.email, user.displayName, user.displayName, user.uid);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

// export function logout(){
//   auth.signOut();
// }

export const registerUserWithEmailAndPassword = (email, name, nickname, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      registerUser(email, name, nickname, user.uid);
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, error.code);
      // ..
    });
};

export const logInWithEmailAndPassword = (email, password, elementDom, callback) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      currentUser();
      callback('#/home');
      console.log(user);

      elementDom.innerText = '';
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      elementDom.innerText = errorMessage;
      console.log(errorMessage);
    });
};

export const logOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    currentUser();
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
};
