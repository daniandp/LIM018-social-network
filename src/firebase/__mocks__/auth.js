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

export const logInWithEmailAndPass = (email, password) => {
  if (email === 'email@verify.com' && password === '123456') {
    return Promise.resolve(
      {
        user: {
          emailVerified: true,
        },
      },
    );
  // eslint-disable-next-line no-else-return
  } else {
    return Promise.resolve(
      {
        user: {
          emailVerified: false,
        },
      },
    );
  }
  // Promise.resolve({
  //   if(emailVerified){
  //       //     user: {
  // //       emailVerified: false,
  // //     },
  //   }
  // });
  // if (user === true) {
  //   return Promise.resolve({
  //     user: {
  //       emailVerified: false,
  //     },
  //   });
  // }
  // return Promise.resolve({
  //   user: {
  //     emailVerified: true,
  //   },
  // });
};
