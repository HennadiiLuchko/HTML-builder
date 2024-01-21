const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'files');
const pathFolderCopyFiles = path.join(__dirname, 'files-copy');
const fsPromises = fs.promises;


async function copyDir() {
    try {
      await fsPromises.rm(pathFolderCopyFiles, { force: true, recursive: true });
      await fsPromises.mkdir(pathFolderCopyFiles, { recursive: true });
      const files = await fsPromises.readdir( pathFolder, { withFileTypes: true }, (error, files) => {
          return files;
        },
      );
      files.map((file) => {
        const pathOriginalFile = path.join(pathFolder, file.name);
        const pathCopyFile = path.join(pathFolderCopyFiles, file.name);
        fsPromises.copyFile(pathOriginalFile, pathCopyFile);
      });
    } catch (error) {
        console.error('Error:', error);
    }
}
  
copyDir();
  
