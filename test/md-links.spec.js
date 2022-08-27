/* const mdLinks = require('../src/index'); */
const axios = require('axios');

const {
  existsPath,
  extNameFile,
  readFileMd,
  validateLinks,
  statFile,
  dirOrFile,
  getLinks,
} = require('../src/index');

jest.mock('axios');

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
    { href: 'https://nodejs.o/', text: 'Node.js', file: 'prueba.md' },
    {
      href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
      text: 'md-links',
      file: 'prueba.md',
    },
    { href: 'https://www.google.com', text: 'google', file: 'prueba.md' },
    {
      file: 'prueba.md',
      href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
      text: 'Funciones — bloques de código reutilizables - MDN',
    },
  ];
  it('Para la ruta prueba.md deberia retornar un array de links', () => {
    expect(readFileMd('prueba.md')).toEqual(arrayLinks);
  });
  it('Para la ruta ./prueba/prueba1.md deberia retornar un mensaje: No se encontro links', () => {
    expect(readFileMd('./prueba/prueba2/prueba3/prueba3.md')).toBe('No se encontro links');
  });
});
describe('validateLinks', () => {
  it('Para la ruta prueba.md deberia retornar un array de links con status 200 y message OK', (done) => {
    const arrayLinks = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'prueba.md',
      },
    ];
    const arrayLinksValidate = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'prueba.md',
        status: 200,
        message: 'OK',
      },
    ];
    axios.get.mockResolvedValueOnce({
      status: 200,
      statusText: 'OK',
    });
    const linksFound = validateLinks(arrayLinks);
    Promise.all(linksFound)
      .then((response) => {
        expect(response).toEqual(arrayLinksValidate);
        done();
      });
  });
  it('Para la ruta prueba.md deberia retornar un array de links con status 404 y message fail', (done) => {
    const arrayLinks = [
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: 'prueba.md',
      },
    ];
    const arrayLinksValidate = [
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: 'prueba.md',
        status: 404,
        message: 'fail',
      },
    ];
    axios.get.mockRejectedValueOnce({
      response: {
        status: 404,
      },
    });
    const linksFound = validateLinks(arrayLinks);
    Promise.all(linksFound)
      .then((response) => {
        expect(response).toEqual(arrayLinksValidate);
        done();
      });
  });
  it('Para la ruta prueba.md deberia retornar un array de links con status -3008 y message fail', (done) => {
    const arrayLinks = [
      {
        href: 'https://nodejs.o/',
        text: 'Node.js',
        file: 'prueba.md',
      },
    ];
    const arrayLinksValidate = [
      {
        href: 'https://nodejs.o/',
        text: 'Node.js',
        file: 'prueba.md',
        status: -3008,
        message: 'fail',
      },
    ];
    axios.get.mockRejectedValueOnce({
      errno: -3008,
    });
    const linksFound = validateLinks(arrayLinks);
    Promise.all(linksFound)
      .then((response) => {
        expect(response).toEqual(arrayLinksValidate);
        done();
      });
  });
});
describe('statFile', () => {
  it('Para la ruta prueba.md deberia retornar true', () => {
    expect(statFile('prueba.md')).toBe(true);
  });
  it('Para la ruta de un directorio: prueba deberia retornar false', () => {
    expect(statFile('prueba')).toBe(false);
  });
});
describe('dirOrFile', () => {
  it('Para la ruta prueba.md deberia retornar un array con la ruta de un archivo', () => {
    expect(dirOrFile('prueba.md')).toEqual(['prueba.md']);
  });
  it('Para la ruta de un directorio: prueba, deberia retornar un array con las rutas de los archivos encontrados', () => {
    const arrayFiles = [
      'prueba\\ejemplo.txt',
      'prueba\\prueba1.md',
      'prueba\\prueba2\\prueba2.md',
      'prueba\\prueba2\\prueba3\\prueba3.md',
      'prueba\\prueba2\\prueba3\\prueba3.txt',
    ];
    expect(dirOrFile('prueba')).toEqual(arrayFiles);
  });
});

describe('getLinks', () => {
  it('Para la ruta prueba deberia retornar un array de links', () => {
    const arrayLinks = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'prueba.md',
      },
      { href: 'https://nodejs.o/', text: 'Node.js', file: 'prueba.md' },
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: 'prueba.md',
      },
      { href: 'https://www.google.com', text: 'google', file: 'prueba.md' },
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: 'prueba.md',
      },
    ];
    expect(getLinks('prueba.md')).toEqual(arrayLinks);
  });
  it('Para la ruta prueba/prueba2/prueba3/prueba3.md, deberia retornar un array vacio', () => {
    expect(getLinks('prueba/prueba2/prueba3/prueba3.md')).toEqual([]);
  });
});
/* describe('mdLinks', () => {
  it('should...', () => {
    console.log(mdLinks);
    console.log('FIX ME!');
  });
}); */
