const { getFiles } = require('./index');

const { join } = require('path');

describe('getFiles', () => {
  it('gets all files from a specific src', done => {
    getFiles(join(__dirname, 'test-files'), (err, data) => {
      expect(data).toEqual(['1.txt', '2.txt', '3.txt', '4.txt']);
      done();
    });
  });
}); 
