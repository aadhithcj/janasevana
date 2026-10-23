// Minimal static server for the export in out/ (trailing-slash routes, 404.html).
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('out');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.svg': 'image/svg+xml', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml', '.ico': 'image/x-icon' };

export function serve(port = 4173) {
  const server = http.createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(root, p);
    try {
      const st = await stat(file);
      if (st.isDirectory()) file = path.join(file, 'index.html');
    } catch {
      if (!path.extname(file)) file = path.join(file, 'index.html');
    }
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
      res.end(await readFile(path.join(root, '404.html')));
    }
  });
  return new Promise((r) => server.listen(port, () => r(server)));
}

if (process.argv[1].endsWith('serve.mjs')) {
  const port = Number(process.argv[2] || 4173);
  await serve(port);
  console.log(`http://localhost:${port}`);
}
