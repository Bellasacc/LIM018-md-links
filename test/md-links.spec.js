const axios = require('axios');

const {
  existsPath,
  extNameFile,
  readFileMd,
  validateLinks,
  statFile,
  dirOrFile,
  getLinks,
  calculateStats,
  mdLinks,
} = require('../src/index');

jest.mock('axios');

describe('existsPath', () => {
  it('Para la ruta ./prueba/prueba.md deberia retornar true', () => {
    expect(existsPath('./prueba/prueba.md')).toBe(true);
  });
  it('Para la ruta D:\\Laboratoria\\LIM018-md-links\\prueba\\prueba.md deberia retornar true', () => {
    expect(existsPath('D:\\Laboratoria\\LIM018-md-links\\prueba\\prueba.md')).toBe(true);
  });
  it('Para la ruta D:\\Laboratoria\\LIM018-md-links\\gitprueba.md deberia retornar false', () => {
    expect(existsPath('D:\\Laboratoria\\LIM018-md-links\\gitprueba.md')).toBe(false);
  });
});
describe('extNameFile', () => {
  it('Para la ruta ./prueba/prueba.md deberia retornar .md', () => {
    expect(extNameFile('./prueba/prueba.md')).toBe('.md');
  });
  it('Para la ruta D:\\Laboratoria\\LIM018-md-links\\prueba\\prueba.md deberia retornar .md', () => {
    expect(extNameFile('D:\\Laboratoria\\LIM018-md-links\\prueba\\prueba.md')).toBe('.md');
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
      file: './prueba/prueba.md',
    },
    { href: 'https://nodejs.o/', text: 'Node.js', file: './prueba/prueba.md' },
    {
      href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
      text: 'md-links',
      file: './prueba/prueba.md',
    },
    { href: 'https://www.google.com', text: 'google', file: './prueba/prueba.md' },
    {
      file: './prueba/prueba.md',
      href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
      text: 'Funciones — bloques de código reutilizables - MDN',
    },
    {
      file: './prueba/prueba.md',
      href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
      text: 'Funciones — bloques de código reutilizables - MDN',
    },
  ];
  it('Para la ruta ./prueba/prueba.md deberia retornar un array de links', () => {
    expect(readFileMd('./prueba/prueba.md')).toEqual(arrayLinks);
  });
  it('Para la ruta ./prueba/prueba1.md deberia retornar un mensaje: No se encontro links', () => {
    expect(readFileMd('./prueba/prueba2/prueba3/prueba3.md')).toBe('No se encontro links');
  });
});
describe('validateLinks', () => {
  it('Para la ruta ./prueba/prueba.md deberia retornar un array de links con status 200 y message OK', (done) => {
    const arrayLinks = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: './prueba/prueba.md',
      },
    ];
    const arrayLinksValidate = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: './prueba/prueba.md',
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
  it('Para la ruta ./prueba/prueba.md deberia retornar un array de links con status 404 y message fail', (done) => {
    const arrayLinks = [
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: './prueba/prueba.md',
      },
    ];
    const arrayLinksValidate = [
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: './prueba/prueba.md',
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
  it('Para la ruta ./prueba/prueba.md deberia retornar un array de links con status -3008 y message fail', (done) => {
    const arrayLinks = [
      {
        href: 'https://nodejs.o/',
        text: 'Node.js',
        file: './prueba/prueba.md',
      },
    ];
    const arrayLinksValidate = [
      {
        href: 'https://nodejs.o/',
        text: 'Node.js',
        file: './prueba/prueba.md',
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
  it('Para la ruta ./prueba/prueba.md deberia retornar true', () => {
    expect(statFile('./prueba/prueba.md')).toBe(true);
  });
  it('Para la ruta de un directorio: ./prueba deberia retornar false', () => {
    expect(statFile('./prueba')).toBe(false);
  });
});
describe('dirOrFile', () => {
  it('Para la ruta ./prueba/prueba.md deberia retornar un array con la ruta de un archivo', () => {
    expect(dirOrFile('./prueba/prueba.md')).toEqual(['./prueba/prueba.md']);
  });
  it('Para la ruta de un directorio: ./prueba, deberia retornar un array con las rutas de los archivos encontrados', () => {
    const arrayFiles = [
      'prueba\\ejemplo.txt',
      'prueba\\prueba.md',
      'prueba\\prueba1.md',
      'prueba\\prueba2\\prueba2.md',
      'prueba\\prueba2\\prueba3\\prueba3.md',
      'prueba\\prueba2\\prueba3\\prueba3.txt',
    ];
    expect(dirOrFile('prueba')).toEqual(arrayFiles);
  });
});

describe('getLinks', () => {
  it('Para la ruta ./prueba deberia retornar un array de links', () => {
    const arrayLinks = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: './prueba/prueba.md',
      },
      { href: 'https://nodejs.o/', text: 'Node.js', file: './prueba/prueba.md' },
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: './prueba/prueba.md',
      },
      { href: 'https://www.google.com', text: 'google', file: './prueba/prueba.md' },
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: './prueba/prueba.md',
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: './prueba/prueba.md',
      },
    ];
    expect(getLinks('./prueba/prueba.md')).toEqual(arrayLinks);
  });
  it('Para la ruta prueba/prueba2/prueba3/prueba3.md, deberia retornar un array vacio', () => {
    expect(getLinks('prueba/prueba2/prueba3/prueba3.md')).toEqual([]);
  });
});
describe('calculateStats', () => {
  it('Para la ruta ./prueba/prueba.md deberia retornar las estadisticas en un objeto', () => {
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
    expect(calculateStats(arrayLinks)).toEqual({ total: 6, unique: 5 });
  });
});
describe('mdLinks', () => {
  const options = {
    validate: false,
    stats: false,
  };
  it('Para una ruta que no existe deberia retornar un mensaje de no se existe la ruta', () => {
    mdLinks('./prueba/test.md', options)
      .catch((error) => {
        expect(error.message).toBe('no existe la ruta');
      });
  });
  it('Para una ruta ./prueba/prueba.md deberia retornar un array de links con los links de este archivo', () => {
    const arrayLinks = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: './prueba/prueba.md',
      },
      {
        href: 'https://nodejs.o/',
        text: 'Node.js',
        file: './prueba/prueba.md',
      },
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
        text: 'md-links',
        file: './prueba/prueba.md',
      },
      {
        href: 'https://www.google.com',
        text: 'google',
        file: './prueba/prueba.md',
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: './prueba/prueba.md',
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: './prueba/prueba.md',
      },
    ];
    mdLinks('./prueba/prueba.md', options)
      .then((response) => {
        expect(response).toEqual(arrayLinks);
      });
  });
});
