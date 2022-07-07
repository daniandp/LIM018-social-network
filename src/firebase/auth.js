/* eslint-disable import/no-unresolved */
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js';
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js';
import { app } from './conection.js';

const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const registerUser = (email, name, nickname, uid) => {
  addDoc(collection(db, 'users'), {
    email,
    name,
    nickname,
    uid,
  })
    .then((docRef) => {
      // getDocs(collection(db, 'users'))
      //   .then((datos) => {
      //     datos.forEach((doc) => {
      //       console.log(`${doc.id} => ${doc.data().email}`);
      //     });
      //   });
      console.log(db);
      console.log(docRef.id);
      console.log(docRef);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export const authGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
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

export const registerUserWithEmailAndPassword = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
};
