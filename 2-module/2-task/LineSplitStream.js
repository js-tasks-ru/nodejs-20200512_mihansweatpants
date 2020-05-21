const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.remainingChars = '';
  }

  _transform(chunk, encoding, callback) {
    const str = this.remainingChars + chunk.toString();
    const lines = str.split(os.EOL);
    const lastLine = lines.pop();

    for (const line of lines) {
      this.push(line);
    }

    this.remainingChars = lastLine;

    callback();
  }

  _flush(callback) {
    if (this.remainingChars) {
      this.push(this.remainingChars);
    }

    callback();
  }
}

module.exports = LineSplitStream;
