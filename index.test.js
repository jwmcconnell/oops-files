const { getFiles, getFileContent, getFileInfo, renameFile } = require('./index');

const fs = require('fs');
const { join } = require('path');

describe('getFiles', () => {
  beforeEach(done => {
    fs.writeFile(join(__dirname, 'get-files-test', '1.txt'), 'goblin', done);
    fs.writeFile(join(__dirname, 'get-files-test', '2.txt'), 'dragon', done);
    fs.writeFile(join(__dirname, 'get-files-test', '3.txt'), 'shade', done);
    fs.writeFile(join(__dirname, 'get-files-test', '4.txt'), 'bandit', done);
  });

  afterEach(done => {
    fs.unlink(join(__dirname, 'get-files-test', '1.txt'), done);
    fs.unlink(join(__dirname, 'get-files-test', '2.txt'), done);
    fs.unlink(join(__dirname, 'get-files-test', '3.txt'), done);
    fs.unlink(join(__dirname, 'get-files-test', '4.txt'), done);
  });
  
  it('gets all files from a specific src', done => {
    getFiles(join(__dirname, 'get-files-test'), (err, data) => {
      expect(err).toBeFalsy();
      expect(data).toEqual(['1.txt', '2.txt', '3.txt', '4.txt']);
      done();
    });
  });
}); 

describe('getFileContent', () => {
  beforeEach(done => {
    fs.writeFile(join(__dirname, 'content-test.txt'), 'goblin', done);
  });

  afterEach(done => {
    fs.unlink(join(__dirname, 'content-test.txt'), done);
  });

  it('gets the content for a specific file', done => {
    getFileContent(join(__dirname, 'content-test.txt'), (err, data) => {
      expect(err).toBeFalsy();
      expect(data).toEqual('goblin');
      done();
    });
  });
});

describe('getFileInfo', () => {
  beforeEach(done => {
    fs.writeFile(join(__dirname, 'time-test.txt'), 'time test file', done);
  });

  afterEach(done => {
    fs.unlink(join(__dirname, 'time-test.txt'), done);
  });

  it('gets the stats for a specific file', done => {
    getFileInfo(join(__dirname, 'time-test.txt'), (err, data) => {
      expect(err).toBeFalsy();
      expect(data).toEqual(expect.any(String));
      done();
    });
  });
});

describe('renameFile', () => {
  beforeEach(done => {
    fs.writeFile(join(__dirname, 'test.txt'), 'dino', done);
  });

  afterEach(done => {
    fs.unlink(join(__dirname, 'dino.txt'), done);
  });
  
  it('renames the given file to the desired name', done => {
    renameFile(join(__dirname, 'test.txt'), join(__dirname, 'dino.txt'), err => {
      expect(err).toBeFalsy();

      fs.readFile(join(__dirname, 'dino.txt'), { encoding: 'utf8' }, (err, content) => {
        expect(err).toBeFalsy();
        expect(content).toEqual('dino');
        done();
      });
    });
  });
});
