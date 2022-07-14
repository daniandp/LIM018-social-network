/* eslint-disable import/no-unresolved */
import {
  getAuth, signInWithPopup, GoogleAuthProvider,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, sendEmailVerification,
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js';
import { getFirestore, setDoc, doc, addDoc, collection /* getDocs */ } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js';
import { app } from './conection.js';

const db = getFirestore(app);
export const auth = getAuth();
export const stateUser = onAuthStateChanged;
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

export const authGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // currentUser();
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

export const registerUserWithEmailAndPassword = (email, name, nickname, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      registerUser(email, name, nickname, user.uid);
      // ...
      sendEmailVerification(auth.currentUser)
        .then(() => {
        // Email verification sent!
          console.log('correo enviado');
        // ...
        });
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, error.code);
      // ..
    });
};

export const logInWithEmailAndPassword = (email, password, messageDom/* , callback */) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // currentUser();
      /* callback('#/home'); */
      if (user.emailVerified) {
        console.log(user);
        console.log(user.emailVerified);
        // eslint-disable-next-line no-param-reassign
        messageDom.innerText = '';
        window.location.hash = '#/home';
      } else {
        // eslint-disable-next-line no-param-reassign
        messageDom.innerText = 'El usuario no se encuentra verificado';
      }
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      // eslint-disable-next-line no-param-reassign
      messageDom.innerText = errorMessage;
      console.log(errorMessage);
    });
};

export const logOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    // currentUser();
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
};
