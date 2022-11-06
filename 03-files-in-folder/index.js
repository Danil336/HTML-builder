const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "secret-folder");

fs.readdir(filePath, 'utf-8', (err, content) => {
  if(err){
    throw err
  }
  content.forEach(file => {
    if(fs.statSync(`${filePath}/${file}`).isFile()) {
      console.log(
        file.split('.').slice(0, -1).join(), '-', path.extname(file), '-', fs.statSync(`${filePath}/${file}`).size / 1000 + 'kb'
      )
    }
  });
})