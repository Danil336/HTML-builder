const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "project-dist");
const fileFinal = path.join(filePath, "index.html");
// const fileComponents = path.join(__dirname, "components");
const fileTemplate = path.join(__dirname, "template.html");
const fileStyles = path.join(__dirname, "styles")
const fileDistStyle = path.join(__dirname, 'project-dist', 'style.css')

fs.mkdir(filePath, (err) => {
  if (err) {
  }
});

fs.copyFile(fileTemplate, fileFinal, (err) => {
  if (err) {
  }
});

let temp = "";
let header = path.join(__dirname, "components", "header.html");
let articles = path.join(__dirname, "components", "articles.html");
let footer = path.join(__dirname, "components", "footer.html");

// с циклами была полная лажа, очень плохо, зато не нарушаю условия
fs.readFile(fileTemplate, "utf-8", (err, content) => {
  if (err) {
  }
  temp = content;
  if (temp.indexOf("{{header}}") != -1) {
    fs.readFile(header, "utf-8", (err, code) => {
      if(err) {}
      temp = temp.replace("{{header}}", code)
    });
  }
  if (temp.indexOf("{{articles}}") != -1) {
    fs.readFile(articles, "utf-8", (err, code) => {
      if(err) {}
      temp = temp.replace("{{articles}}", code)
    });
  }
  if (temp.indexOf("{{footer}}") != -1) {
    fs.readFile(footer, "utf-8", (err, code) => {
      if(err) {}
      temp = temp.replace("{{footer}}", code)
      fs.truncate(fileFinal, err => {
        if(err){}
        fs.appendFile(fileFinal, temp, err => {
          if(err){}
        })
      })
    });
  }
}); 

fs.readdir(fileStyles, 'utf-8', (err, content) => {
  content.forEach(file => {
    if(path.extname(file) == '.css'){
      fs.readFile(`${fileStyles}/${file}`, 'utf-8', (err, code) => {
        if(err) throw err
        fs.appendFile(fileDistStyle, code, (err) => {
          if(err) {}
        })
      })
    }
  }) 
})

const fileAssets = path.join(__dirname, "assets");
const copyAssets = path.join(__dirname, "project-dist");


// console.log(copyAssets)

// fs.readdir(fileAssets, "utf-8", (err, content) => {
//   if (err) {
//     throw err;
//   }

//   fs.mkdir("06-build-page/project-dist/assets", (err) => {
//     if (err) {
//     }
//   });
  
  // content.forEach((file) => {
    // fs.copyFile(`${fileAssets}/${file}`, `${copyAssets}/${file}`, (err) => {
    //   if (err) throw err;
    // });
  // });
// });


// startCopyFile(fileAssets)

// function startCopyFile(_dir){
//   fs.readdir(_dir, function(err, items){
//       for (let i = 0; i < items.length; i++){
//           if (fs.lstatSync(_dir + '/' + items[i]).isDirectory()){
//               fs.mkdir(`${filePath}/assets/${items[i]}`, err => {

//               })
//               startCopyFile(_dir + '/' + items[i])
//           } 
//           else {
//               fs.copyFile(_dir + '/' + items[i], `${copyAssets}/${items[i]}`, err => {

//               })
//           }
//       }
//   });
// }


copyFolderRecursiveSync(fileAssets, copyAssets)

function copyFileSync( source, target ) {

  var targetFile = target;

  if ( fs.existsSync( target ) ) {
      if ( fs.lstatSync( target ).isDirectory() ) {
          targetFile = path.join( target, path.basename( source ) );
      }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
  var files = [];

  var targetFolder = path.join( target, path.basename( source ) );
  if ( !fs.existsSync( targetFolder ) ) {
      fs.mkdirSync( targetFolder );
  }

  if ( fs.lstatSync( source ).isDirectory() ) {
      files = fs.readdirSync( source );
      files.forEach( function ( file ) {
          var curSource = path.join( source, file );
          if ( fs.lstatSync( curSource ).isDirectory() ) {
              copyFolderRecursiveSync( curSource, targetFolder );
          } else {
              copyFileSync( curSource, targetFolder );
          }
      } );
  }
}

// как это еще сделать без сторонних модулей и синхронно? Если есть решение, напиши в комментарии к ревью, пожалуйста
