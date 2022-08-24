const fs = require('node:fs');

const existsPath = (route) => fs.existsSync(route);

console.log(existsPath('prueba.md'));
console.log(existsPath('D:\\Laboratoria\\LIM018-md-links\\prueba.md'));

module.exports = {
  existsPath,
};
