const fs = require('fs');
const path = require('path');

const pathFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(path.resolve(pathFile));

stream.on('data', (chunk) => console.log(chunk.toString()));