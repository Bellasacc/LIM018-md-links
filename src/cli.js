const { mdLinks } = require('./index');

const args = process.argv.slice(2);
const path = args[0];
const options = {
  validate: false,
  stats: false,
};
if (args.length === 0) {
  console.log('Escribe una ruta por ejemplo: mdLinks ./prueba.md');
}
if (args.length === 1 && args[0]) {
  mdLinks(path)
    .then((response) => {
      response.forEach((element) => {
        console.log(element.file, element.href, element.text);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}
