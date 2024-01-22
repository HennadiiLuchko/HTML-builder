const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;


const pathFolderDist = path.join(__dirname, 'project-dist');
const assetsPath = path.join(__dirname, 'assets');
const assetsCopyPath = path.join(__dirname, 'project-dist', 'assets');
const pathTemplateFile = path.join(__dirname, 'template.html');
const pathComponentsFolder = path.join(__dirname, 'components');
const pathHTMLFile = path.join(__dirname, 'project-dist', 'index.html');
const pathFolderStyles = path.join(__dirname, 'styles');
const bundleFile = path.join(__dirname, 'project-dist', 'style.css');


async function createFolder() { 
    await fsPromises.mkdir(pathFolderDist, { recursive: true }); 
    await bundleHTML();
    await bundleCSS();
    await copyDir(assetsPath, assetsCopyPath);
}
  

async function bundleCSS() {
    const files = await fsPromises.readdir(pathFolderStyles, { withFileTypes: true }); 
    const writeStream = fs.createWriteStream(bundleFile);
  
    files.forEach((file) => {
        if (file.isFile() && path.parse(file.name).ext === '.css') {
            const filePath = path.join(pathFolderStyles, file.name);
            const readStream = fs.createReadStream(filePath, 'utf-8');
      
            readStream.pipe(writeStream);
        }
    });
}

async function copyDir(pathFolder, pathFolderCopyFiles) {
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
        file.isDirectory()? copyDir(pathOriginalFile, pathCopyFile) : fsPromises.copyFile(pathOriginalFile, pathCopyFile);   
      });
    } catch (error) {
        console.error('Error:', error);
    }
}


async function bundleHTML() {
    await copyFile(pathTemplateFile, pathHTMLFile);
    let HTMLfile = await fsPromises.readFile(pathHTMLFile, 'utf-8');
    const components = await fsPromises.readdir(pathComponentsFolder, { withFileTypes: true });
    const resultHTML = await replaceTags(components, pathComponentsFolder, HTMLfile);
    await fsPromises.writeFile(pathHTMLFile, resultHTML);
}
  
async function copyFile(pathFile, bundleFile) {
    const contentFile = await fsPromises.readFile(pathFile, 'utf-8');
    await fsPromises.writeFile(bundleFile, contentFile);
}
  
async function replaceTags(files, pathFolder, resultFile) {
    for (let i = 0; i < files.length; i += 1) {
        if (files[i].isFile() && path.parse(files[i].name).ext === '.html') {
            const fileComponent = path.join(pathFolder, files[i].name);
            const nameComponent = path.parse(files[i].name).name;
            const readComponent = await fsPromises.readFile(fileComponent, 'utf-8');
            resultFile = resultFile.replace(`{{${nameComponent}}}`, readComponent);
        }
    }

    return resultFile;
}
  
createFolder();
