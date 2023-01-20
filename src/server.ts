import http from 'http';

export const app = http.createServer((req, res) => {
  try {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify('Server started'));
    res.end();
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify('INTERNAL SERVER ERROR'));
    res.end();
  }
});

process.on('uncaughtException', (error: Error) => {
  console.error(error.stack);
  process.exit(1);
});
