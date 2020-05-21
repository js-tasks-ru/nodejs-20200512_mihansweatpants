const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.bytesProcessed = 0;
    this.bytesLimit = options.limit;
  }

  _transform(chunk, encoding, callback) {
    this.bytesProcessed += Buffer.byteLength(chunk, encoding);

    if (this.bytesProcessed > this.bytesLimit) {
      return callback(new LimitExceededError());
    }

    callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
