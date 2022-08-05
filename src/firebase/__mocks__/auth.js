export const signInWithPopup = () => {
  Promise.resolve({
    user: {
      uid: '123',
    },
  });
};

const user = {
  name: 'rosalia',
  imgProfile: null,
};

export const registerUserAuth = jest.fn();
export const sendEmailVerif = jest.fn();
export const registerUserFirestore = jest.fn();
export const logInWithEmailAndPass = jest.fn();
export const getUser = () => Promise.resolve({ data: () => user });
export const logOut = jest.fn();
export const auth = { currentUser: { uid: '123' } };
