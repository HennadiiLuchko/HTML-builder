const fs = require('fs');
const path = require('path');
const { stdout } = process;

const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathFolder, { withFileTypes: true }, (error, files) => {
    if (error) console.log(error.message);

    files.forEach((elem) => {
      if (elem.isFile()) {
        const pathFile = path.join(pathFolder, elem.name);
        const nameFile = path.parse(pathFile).name;
        const extFile = path.parse(pathFile).ext.slice(1);

        fs.stat(pathFile, (error, stats) => {
          if (error) console.log(error.message);
          stdout.write(`${nameFile} - ${extFile} - ${stats.size / 1000}kb\n`);
        });
      }
    });
});
  
