export const signInWithPopup = () => {
  Promise.resolve({
    user: {
      uid: '123',
    },
  });
};

export const registerUserAuth = () => {
  Promise.resolve({
    user: {
      email: 'yunoshe1@gmail.com',
      pass: '123',
    },
  });
};

export const logInWithEmailAndPass = () => Promise.resolve({
  user: {
    emailVerified: true,
  },
});
