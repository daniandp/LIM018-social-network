export const signInWithPopup = () => {
  Promise.resolve({
    user: {
      uid: '123',
    },
  });
};

const user = {
  name: 'rosalia',
  imgProfile: 'https://lh3.googleusercontent.com/a/AItbvmn72LYQ0Zp37_jVQ7TKfGSS7U70b0APdDt0j2r-=s96-c',
};

export const registerUserAuth = jest.fn();
export const sendEmailVerif = jest.fn();
export const registerUserFirestore = jest.fn();
export const logInWithEmailAndPass = jest.fn();
export const getUser = () => Promise.resolve({ data: () => user });
export const logOut = jest.fn();
export const auth = { currentUser: { uid: '123' } };
export const getPost = () => { };
export const createPost = jest.fn();
export const deletePost = jest.fn();
export const editPost = jest.fn();
