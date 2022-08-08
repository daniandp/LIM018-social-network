import error404 from '../src/view/error404.js';

describe('ERROR404', () => {
  document.body.appendChild(error404());

  it('Debería existir una imagen gif de error para ruta desconocida', () => {
    const imgError = document.querySelector('img');
    expect(imgError instanceof HTMLElement).toBe(true);
    expect(imgError.hasAttribute('src')).toBe(true);
  });
});
