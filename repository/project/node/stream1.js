var fs = require('fs');
var rr = fs.createReadStream('stdout.log');
rr.on('readable', function() {
  console.log('readable:', rr.read());
});
rr.on('end', function() {
  console.log('end');
});

var readable = getReadableStreamSomehow();
readable.setEncoding('utf8');
readable.on('data', function(chunk) {
  assert.equal(typeof chunk, 'string');
  console.log('got %d characters of string data', chunk.length);
});