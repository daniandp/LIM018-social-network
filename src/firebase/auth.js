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
};
const querySnapshot = (query) => {
  const arr = [];
  query.forEach((docs) => {
    // console.log(docs.data());
    arr.push(docs.data());
  });
  //console.log(arr);
  return arr;
};
/* funcion para obtener informacion de los post */
export const getPost = async () => {
  try {
    // console.log('se trajo algo de coleccion post');
    // console.log((collection(db, 'post')));
    return await onSnapshot((collection(db, 'post')), querySnapshot);
  } catch (e) {
    // console.log('dentro de catch', e);
    throw Error('(╯°□°）╯︵ ┻━┻');
  }
};

// const q = query(collection(db, "cities"), where("state", "==", "CA"));
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   const cities = [];
//   querySnapshot.forEach((doc) => {
//       cities.push(doc.data().name);
//   });
//   console.log("Current cities in CA: ", cities.join(", "));
// });

/* const getPost = () => {
  const queryPost = (collection(db, 'post'));
  onSnapshot(queryPost, (querySnapshot) => {
    querySnapshot.forEach((post) => {
      const divPost = document.createElement('div');
      divPost.innerHTML = (post.data());
    });
  });
};
 */
export const logOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    // currentUser();
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
};
