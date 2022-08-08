// importamos la funcion que vamos a testear
import { registerUserAuth } from '../src/firebase/auth';

jest.mock('../src/firebase/auth');

describe('REGISTER-USER-AUTH', () => {
  it('Debería ser una función', () => {
    expect(typeof registerUserAuth).toBe('function');
  });
});
