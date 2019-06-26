/* 
1. Add files to test with
2. Get all the files
  a. Read its content
  b. Read its date last edited
3. loop through all of the files
4. Rename each file based on content and edited data
*/

const fs = require('fs');
const { join, parse } = require('path');


const getFiles = (src, callback) => {
  fs.readdir(src, callback);
};

const getFileContent = (src, callback) => {
  fs.readFile(src, { encoding: 'utf8' }, callback);
};

const getFileInfo = (src, callback) => {
  fs.stat(src, (err, data) => {
    callback(err, data && data.mtime.toISOString());
  });
};

const renameFile = (src, dest, callback) => {
  fs.rename(src, dest, callback);
};

const renameFiles = (src, callback) => {
  getFiles(src, (err, files) => {
    if(err) return callback(err);

    let renamedSoFar = 0;

    files.forEach(file => {

      getFileContent(join(src, file), (err, content) => {
        if(err) return callback(err);

        getFileInfo(join(src, file), (err, date) => {
          if(err) return callback(err);

          renameFile(join(src, file), join(src, content + '-' + parse(file).name + '-' + date), (err) => {
            if(err) return callback(err);
            
            renamedSoFar++;
            if(renamedSoFar === files.length) callback();
          });
        });
      });
    });
  });
};

module.exports = { getFiles, getFileContent, getFileInfo, renameFile, renameFiles };
