const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin, stdout, exit } = process;

const pathFile = path.join(__dirname, 'text.txt');
const input = readline.createInterface(stdin);
const output = fs.createWriteStream(path.resolve(pathFile));

stdout.write("What is your name?\n");

function exitHandler() {
    stdout.write('\nGoodbye!');
    exit();
};

input.on('line', (data) => {
    if (data === 'exit') exitHandler();
    output.write(`${data}`);
});
  
process.on('SIGINT', exitHandler);
