const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "files");
const copyPath = path.join(__dirname, "files-copy");

fs.readdir(filePath, "utf-8", (err, content) => {
  if (err) {
    throw err;
  }

  fs.mkdir("04-copy-directory/files-copy", (err) => {
    if (err) {
    }
  });
  
  content.forEach((file) => {
    fs.copyFile(`${filePath}/${file}`, `${copyPath}/${file}`, (err) => {
      if (err) throw err;
    });
  });
});
