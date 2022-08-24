const fs = require('node:fs');
const path = require('node:path');

const existsPath = (route) => fs.existsSync(route);

const extNameFile = (route) => path.extname(route);

console.log(extNameFile('prueba.md'));
console.log(extNameFile('D:\\Laboratoria\\LIM018-md-links\\prueba.md'));
console.log(extNameFile('../prueba/ejemplo.txt'));

module.exports = {
  existsPath,
  extNameFile,
};
