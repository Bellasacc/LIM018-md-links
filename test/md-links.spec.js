/* const mdLinks = require('../src/index'); */

const { existsPath } = require('../src/index');

describe('existsPath', () => {
  it('Para la ruta prueba.md deberia retornar true', () => {
    expect(existsPath('prueba.md')).toBe(true);
  });
  it('Para la ruta D:\\Laboratoria\\LIM018-md-links\\prueba.md deberia retornar true', () => {
    expect(existsPath('D:\\Laboratoria\\LIM018-md-links\\prueba.md')).toBe(true);
  });
  it('Para la ruta D:\\Laboratoria\\LIM018-md-links\\gitprueba.md deberia retornar false', () => {
    expect(existsPath('D:\\Laboratoria\\LIM018-md-links\\gitprueba.md')).toBe(false);
  });
});

/* describe('mdLinks', () => {
  it('should...', () => {
    console.log(mdLinks);
    console.log('FIX ME!');
  });
}); */
