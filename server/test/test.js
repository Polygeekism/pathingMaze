const builder = require('../maze/builder.js');
const assert = require('assert');

describe('basic test of the buildMaze function', () => {
  it('returns result with solution', () => {
    var result = builder('##### #A..# ###.# #.B.# #####');

    assert(result);
    console.log('result', result);
    assert.equal(result.path.length, 5);
    assert.equal(result.gridSize[0], 5);
  });
});
