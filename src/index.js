const fs = require('node:fs');
const path = require('node:path');

const existsPath = (route) => fs.existsSync(route);

const extNameFile = (route) => path.extname(route);

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

console.log(readFileMd('./prueba/prueba1.md'));

module.exports = {
  existsPath,
  extNameFile,
  readFileMd,
};
