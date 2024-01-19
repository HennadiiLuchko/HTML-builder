const fs = require('fs');
const path = require('path');

const pathFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(path.resolve(pathFile));

let data = '';

stream.on('data', (chunk) => console.log(data + chunk.toString()));
stream.on('error', (error) => console.log('Error', error.message));