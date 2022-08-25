/* const mdLinks = require('../src/index'); */

const { existsPath, extNameFile, readFileMd } = require('../src/index');

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
describe('readFileMd', () => {
  const arrayLinks = [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'prueba.md',
    },
    { href: 'https://nodejs.org/', text: 'Node.js', file: 'prueba.md' },
    {
      href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
      text: 'md-links',
      file: 'prueba.md',
    },
    { href: 'www.google.com', text: 'google', file: 'prueba.md' },
  ];
  it('Para la ruta prueba.md deberia retornar un array de links', () => {
    expect(readFileMd('prueba.md')).toEqual(arrayLinks);
  });
  it('Para la ruta ./prueba/prueba1.md deberia retornar un mensaje: No se encontro links', () => {
    expect(readFileMd('./prueba/prueba1.md')).toBe('No se encontro links');
  });
});

/* describe('mdLinks', () => {
  it('should...', () => {
    console.log(mdLinks);
    console.log('FIX ME!');
  });
}); */
