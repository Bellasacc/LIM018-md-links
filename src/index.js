const fs = require('node:fs');
const path = require('node:path');
const axios = require('axios');

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

const validateLinks = (urls) => {
  const arrayLinks = urls;
  return arrayLinks.map((url) => axios.get(url.href)
    .then((response) => ({ ...url, status: response.status, message: response.statusText }))
    .catch((error) => (error.response ? { ...url, status: error.response.status, message: 'fail' }
      : { ...url, status: error.errno, message: 'fail' })));
};

let linksFound = readFileMd('README.md');

linksFound = validateLinks(linksFound);

Promise.all(linksFound)
  .then((response) => {
    console.log(response);
  });

module.exports = {
  existsPath,
  extNameFile,
  readFileMd,
};
