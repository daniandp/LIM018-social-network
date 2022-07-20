export default () => {
  // CREACIÓN DEL TEMPLATE
  const viewError = `
    <h1>Error 404, Página no encontrada</h1> <br>
    <img src="img/error2.gif" alt="gif de error">`;

  // CREANDO NODO SECTION
  const section = document.createElement('section');
  section.setAttribute('class', 'error-style');
  section.innerHTML = viewError;
  return section;
};
