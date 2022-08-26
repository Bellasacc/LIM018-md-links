const fs = require('node:fs');
const path = require('node:path');
const axios = require('axios');

// Funcion para verificar si existe una ruta
const existsPath = (route) => fs.existsSync(route);

// Funcion para verificar la extension de un archivo
const extNameFile = (route) => path.extname(route);

// Funcion para leer un archivo markdown y obtener los links
const readFileMd = (file) => {
  const readFile = fs.readFileSync(file, 'utf-8');
  const exp = /\[(.*?)\]\(.*?\)/gm;
  let dataFile = readFile.match(exp);
  if (dataFile !== null) {
    dataFile = dataFile.map((link) => {
      const finalText = link.indexOf(']');
      return {
        href: link.slice(finalText + 2, link.length - 1),
        text: link.slice(1, finalText),
        file,
      };
    });
    return dataFile.filter((data) => data.href.startsWith('http') || data.href.startsWith('www'));
  }
  return 'No se encontro links';
};

// Funcion para hacer las peticiones http de los links que se hubieran encontrado
const validateLinks = (urls) => {
  const arrayLinks = urls;
  return arrayLinks.map((url) => axios.get(url.href)
    .then((response) => ({ ...url, status: response.status, message: response.statusText }))
    .catch((error) => (error.response ? { ...url, status: error.response.status, message: 'fail' }
      : { ...url, status: error.errno, message: 'fail' })));
};

// Funcion para verificar si es un file
const statFile = (route) => fs.statSync(route).isFile();

// Funcion recursiva para obtener los files de directorios
const dirOrFile = (router) => {
  // Preguntando si es un file
  if (statFile(router)) {
    return [router];
  }
  const filenames = fs.readdirSync(router); // Obteniendo los files de un directorio
  return filenames.map((file) => dirOrFile(path.join(router, file))).flat();
};
const route = 'prueba';
console.log(dirOrFile(route));

module.exports = {
  existsPath,
  extNameFile,
  readFileMd,
  validateLinks,
};
