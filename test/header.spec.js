import header, { scrollUp } from '../src/view/header.js';

jest.mock('../src/firebase/auth');

describe('HEADER', () => {
  document.body.appendChild(header());
  it('el scroll vuelva a 0 al ejecutar la función', () => {
    let scroll = document.documentElement.scrollTop;
    scroll = 10;
    scrollUp();
    expect(scroll).toBe(0);
  });
});
