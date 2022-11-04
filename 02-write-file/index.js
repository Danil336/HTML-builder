const fs = require("fs");
const path = require("path");
const readline = require("readline");
// const EventEmitter = require("events");

// const emitter = new EventEmitter();

// emitter.on('string', content => {
//   fs.appendFile(filePath, content, (err) => {
//     if(err) {
//       throw err
//     }
//   })
// })

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filePath = path.join(__dirname, "text.txt");

fs.appendFile(filePath, "", (err) => {
  if (err) {
    throw err;
  }
});

function appendFiles(input) {
  if(input == 'exit'){
    process.exit()
  }
  fs.appendFile(filePath, input, (err) => {
    if (err) {
      throw err;
    }
  });
}

rl.question("What do you want to add? ", (input) => {
  appendFiles(input);
});

rl.on("line", (input) => {
  appendFiles(input);
});

function exitHandler() {
  console.log("End!");
}

process.on("exit", exitHandler.bind());
