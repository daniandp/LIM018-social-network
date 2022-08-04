export const signInWithPopup = () => {
  Promise.resolve({
    user: {
      uid: '123',
    },
  });
};

export const registerUserAuth = jest.fn();
export const sendEmailVerif = jest.fn();

/* export const registerUserFirestore = jest.fn().mockImplementation
((email, name, nickname, uid, imgProfile) => {
  return promise
}); */

export const logInWithEmailAndPass = jest.fn();
