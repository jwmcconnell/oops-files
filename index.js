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
  fs.readdir(src, (err, data) => {
    callback(err, data);
  });
};

const getFileContent = (src, callback) => {
  fs.readFile(src, { encoding: 'utf8' }, (err, data) => {
    callback(err, data);
  });
};

const getFileInfo = (src, callback) => {
  fs.stat(src, (err, data) => {
    callback(err, data.mtime.toISOString());
  });
};

const renameFile = (src, dest, callback) => {
  fs.rename(src, dest, (err) => {
    callback(err);
  });
};

const renameFiles = (src) => {
  getFiles(src, (err, files) => {
    if(err) console.error(err);

    files.forEach(file => {
      getFileContent(join(src, file), (err, content) => {
        if(err) console.error(err);

        getFileInfo(join(src, file), (err, date) => {
          if(err) console.error(err);

          renameFile(join(src, file), join(src, content + '-' + parse(file).name + '-' + date), (err) => {
            if(err) console.error(err);
          });
        });
      });
    });
  });
}; 

renameFiles(join(__dirname, 'test-files'));

module.exports = { getFiles, getFileContent, getFileInfo, renameFile };
