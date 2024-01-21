const fs = require('fs');
const path = require('path');

const pathFolderStyles = path.join(__dirname, 'styles');
const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(pathFolderStyles, { withFileTypes: true }, (error, files) => {
  if (error) console.error('Error:', error);

  const writeStream = fs.createWriteStream(bundleFile);

  files.forEach((file) => {
    if (file.isFile() && path.parse(file.name).ext === '.css') {
      const filePath = path.join(pathFolderStyles, file.name);
      const readStream = fs.createReadStream(filePath, 'utf-8');

      readStream.pipe(writeStream);
    }
  });
});