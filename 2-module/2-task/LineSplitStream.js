const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.lines = '';
  }

  _transform(chunk, encoding, callback) {
    this.lines += chunk;
    callback();
  }

  _flush(callback) {
    for (const line of this.lines.split(os.EOL)) {
      this.push(line);
    }

    callback();
  }
}

module.exports = LineSplitStream;
