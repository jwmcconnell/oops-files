/* 
1. Add files to test with
2. Get all the files
  a. Read its content
  b. Read its date last edited
3. loop through all of the files
4. Rename each file based on content and edited data
*/

const fs = require('fs');

const getFiles = (src, callback) => {
  fs.readdir(src, (err, data) => {
    callback(err, data);
  });
};

module.exports = { getFiles };
