const fs = require('node:fs');
const path = require('node:path');

const existsPath = (route) => fs.existsSync(route);

const extNameFile = (route) => path.extname(route);

const readFileMd = (file) => {
  const readFile = fs.readFileSync(file, 'utf-8');
  return readFile;
};

console.log(readFileMd('prueba.md'));

module.exports = {
  existsPath,
  extNameFile,
};
