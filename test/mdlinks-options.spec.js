const { mdLinks } = require('../src/index');

const arrayLinks = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: './prueba/prueba.md',
    status: 200,
    message: 'OK',
  },
  {
    href: 'https://nodejs.o/',
    text: 'Node.js',
    file: './prueba/prueba.md',
    status: -3008,
    message: 'fail',
  },
  {
    href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    file: './prueba/prueba.md',
    status: 200,
    message: 'OK',
  },
  {
    href: 'https://www.google.com',
    text: 'google',
    file: './prueba/prueba.md',
    status: 200,
    message: 'OK',
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
    text: 'Funciones — bloques de código reutilizables - MDN',
    file: './prueba/prueba.md',
    status: 404,
    message: 'fail',
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
    text: 'Funciones — bloques de código reutilizables - MDN',
    file: './prueba/prueba.md',
    status: 404,
    message: 'fail',
  },
];

jest.mock('../src/index', () => {
  const index = jest.requireActual('../src/index');
  index.validateLinks = jest.fn(() => [
    Promise.resolve({
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: './prueba/prueba.md',
      status: 200,
      message: 'OK',
    }),
    Promise.resolve({
      href: 'https://nodejs.o/',
      text: 'Node.js',
      file: './prueba/prueba.md',
      status: -3008,
      message: 'fail',
    }),
    Promise.resolve({
      href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
      text: 'md-links',
      file: './prueba/prueba.md',
      status: 200,
      message: 'OK',
    }),
    Promise.resolve({
      href: 'https://www.google.com',
      text: 'google',
      file: './prueba/prueba.md',
      status: 200,
      message: 'OK',
    }),
    Promise.resolve({
      href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
      text: 'Funciones — bloques de código reutilizables - MDN',
      file: './prueba/prueba.md',
      status: 404,
      message: 'fail',
    }),
    Promise.resolve({
      href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
      text: 'Funciones — bloques de código reutilizables - MDN',
      file: './prueba/prueba.md',
      status: 404,
      message: 'fail',
    }),
  ]);
  return index;
});

it('Para una ruta ./prueba/prueba.md y opcion --validate deberia retornar un array de links con status y message', (done) => {
  const options = {};
  options.validate = true;
  options.stats = false;
  mdLinks('./prueba/prueba.md', options)
    .then((response) => {
      expect(response).toEqual(arrayLinks);
      done();
    });
});
it('Para una ruta ./prueba/prueba.md y opcion --validate --stats deberia retornar un objeto: { total: 6, unique: 5, broquen: 3 }', (done) => {
  const options = {};
  options.validate = true;
  options.stats = true;
  mdLinks('./prueba/prueba.md', options)
    .then((response) => {
      expect(response).toEqual({ total: 6, unique: 5, broquen: 3 });
      done();
    });
});
it('Para una ruta ./prueba/prueba.md y opcion --stats deberia retornar un objeto: { total: 6, unique: 5 }', (done) => {
  const options = {};
  options.validate = false;
  options.stats = true;
  mdLinks('./prueba/prueba.md', options)
    .then((response) => {
      expect(response).toEqual({ total: 6, unique: 5 });
      done();
    });
});
