const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const LimitSizeStream = require('./LimitSizeStream');

const FILE_SIZE_LIMIT = 1000000;

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'POST':
      if (pathname.indexOf('/') !== -1) {
        res.statusCode = 400;
        res.end('Nested paths not allowed');
        return;
      }

      fs.access(filepath, (err) => {
        if (err) {
          const file = fs.createWriteStream(filepath);
          const limitStream = new LimitSizeStream({limit: FILE_SIZE_LIMIT});

          limitStream.on('error', () => {
            limitStream.end(() => {
              fs.unlink(filepath, () => {
                res.statusCode = 413;
                res.end('File size exceeds 1MB');
              });
            });
          });

          file.on('finish', () => {
            res.statusCode = 201;
            res.end('Successfully written to file');
          });

          req.on('close', () => {
            fs.unlinkSync(filepath);
          });

          req.pipe(limitStream).pipe(file);
        } else {
          res.statusCode = 409;
          res.end('File already exists');
        }
      });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
