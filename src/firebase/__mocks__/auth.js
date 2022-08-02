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

export const logInWithEmailAndPass = jest.fn().mockImplementation((email, password) => {
  const promise = new Promise((resolve /* , reject */) => {
    let test = false;
    if (email === 'email2@verify.com' && password === '123abc') {
      // reject({
      //   message: 'Firebase: Error (auth/wrong-password).',
      // });
    }
    if (email === 'email@verify.com' && password === '123456') {
      test = true;
    }
    resolve({
      user: {
        emailVerified: test,
      },
    });
  });
  return promise;
});
