/* const mdLinks = require('../src/index'); */

const { existsPath, extNameFile } = require('../src/index');

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
describe('extNameFile', () => {
  it('Para la ruta prueba.md deberia retornar .md', () => {
    expect(extNameFile('prueba.md')).toBe('.md');
  });
  it('Para la ruta D:\\Laboratoria\\LIM018-md-links\\prueba.md deberia retornar .md', () => {
    expect(extNameFile('D:\\Laboratoria\\LIM018-md-links\\prueba.md')).toBe('.md');
  });
  it('Para la ruta ../prueba/ejemplo.txt deberia retornar .txt', () => {
    expect(extNameFile('../prueba/ejemplo.txt')).toBe('.txt');
  });
});

/* describe('mdLinks', () => {
  it('should...', () => {
    console.log(mdLinks);
    console.log('FIX ME!');
  });
}); */
