const { getFiles, getFileContent } = require('./index');

const { join } = require('path');

describe('getFiles', () => {
  it('gets all files from a specific src', done => {
    getFiles(join(__dirname, 'test-files'), (err, data) => {
      expect(err).toBeFalsy();
      expect(data).toEqual(['1.txt', '2.txt', '3.txt', '4.txt']);
      done();
    });
  });
}); 

describe('getFileContent', () => {
  it('gets the content for a specific file', done => {
    getFileContent(join(__dirname, 'test-files', '1.txt'), (err, data) => {
      expect(err).toBeFalsy();
      expect(data).toEqual('goblin');
      done();
    });
  });
});
