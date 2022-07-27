export const signInWithPopup = () => {
  Promise.resolve({
    user: {
      uid: '123',
    },
  });
};

export const registerUserAuth = (email, pass) => {
  Promise.resolve({
    user: {
      email: 'yunoshe1@gmail.com',
      pass: '123',
    },
  });
};
