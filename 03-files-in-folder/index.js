const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "secret-folder");

fs.readdir(filePath, 'utf-8', (err, content) => {
  if(err){
    throw err
  }
  content.forEach(file => {
    fs.stat(`${filePath}/${file}`, (err, stat) => {
      if(err) throw err
      if(stat.isFile()){
        console.log(
          file.split('.').slice(0, -1).join(), '-', path.extname(file), '-', stat.size / 1000 + 'kb'
        )
      }
    
  });
})})