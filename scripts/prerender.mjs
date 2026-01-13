import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');

if (!existsSync(distDir)) {
  throw new Error(`dist/ not found at ${distDir}. Run "vite build" first.`);
}

const routes =
  process.env.PRERENDER_ROUTES?.split(',')
    .map((r) => r.trim())
    .filter(Boolean) ?? ['/'];

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
      return 'application/javascript; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.txt':
      return 'text/plain; charset=utf-8';
    case '.xml':
      return 'application/xml; charset=utf-8';
    default:
      return 'application/octet-stream';
  }
}

async function readFileIfExists(filePath) {
  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      return { filePath: indexPath, data: await fs.readFile(indexPath) };
    }
    return { filePath, data: await fs.readFile(filePath) };
  } catch {
    return null;
  }
}

// Simple static file server with SPA fallback to dist/index.html
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const rawPathname = decodeURIComponent(url.pathname);
    // Make pathname relative so path resolution stays inside dist/.
    // (path.join(distDir, "/assets/x") would otherwise ignore distDir.)
    const pathname = rawPathname.replace(/^\/+/, '');

    // Normalize path to a filesystem path under dist (and prevent traversal)
    const candidate = path.resolve(distDir, `./${pathname}`);
    if (!candidate.startsWith(distDir)) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Bad request');
      return;
    }
    const resolved = await readFileIfExists(candidate);

    if (resolved) {
      res.writeHead(200, { 'Content-Type': contentTypeFor(resolved.filePath) });
      res.end(resolved.data);
      return;
    }

    // SPA fallback
    const indexHtml = await fs.readFile(path.join(distDir, 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(indexHtml);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`prerender server error: ${err instanceof Error ? err.message : String(err)}`);
  }
});

await new Promise((resolve) => server.listen(0, resolve));
const address = server.address();
if (!address || typeof address === 'string') {
  throw new Error('Failed to start prerender server.');
}
const baseUrl = `http://127.0.0.1:${address.port}`;

console.log(`[prerender] Serving ${distDir}`);
console.log(`[prerender] Base URL: ${baseUrl}`);
console.log(`[prerender] Routes: ${routes.join(', ')}`);

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  for (const route of routes) {
    const page = await browser.newPage();

    // Avoid analytics requests impacting render stability.
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const u = request.url();
      if (u.includes('googletagmanager.com') || u.includes('clarity.ms')) {
        request.abort();
        return;
      }
      request.continue();
    });

    const url = `${baseUrl}${route}`;
    console.log(`[prerender] Rendering ${url}`);

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Wait for React to mount and content to appear.
    await page.waitForFunction(
      () => {
        const w = window;
        const ready = Boolean(w.__PRERENDER_READY__);
        const root = document.getElementById('root');
        const hasText = Boolean(root && root.textContent && root.textContent.trim().length > 100);
        return ready && hasText;
      },
      { timeout: 30_000 }
    );

    const html = await page.content();

    // Single-page default: always write dist/index.html.
    // If you *do* set PRERENDER_ROUTES with multiple routes, we'll also emit
    // dist/<route>/index.html for non-root routes.
    if (route === '/' || route === '') {
      await fs.writeFile(path.join(distDir, 'index.html'), html, 'utf-8');
    } else {
      const normalized = route.replace(/^\//, '').replace(/\/$/, '');
      const outDir = path.join(distDir, normalized);
      await fs.mkdir(outDir, { recursive: true });
      await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf-8');
    }

    await page.close();
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

console.log('[prerender] Done.');

