import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDirectory = fileURLToPath(new URL('./dist/', import.meta.url));

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function resolveRequestedFile(rawPath = '/') {
  let decodedPath;

  try {
    decodedPath = decodeURIComponent(rawPath);
  } catch {
    return null;
  }

  const requestedPath = decodedPath === '/' ? 'index.html' : decodedPath.slice(1);
  const normalizedPath = normalize(requestedPath);

  if (
    normalizedPath.startsWith('..') ||
    normalizedPath.includes('\0') ||
    normalizedPath.includes(':')
  ) {
    return null;
  }

  return join(rootDirectory, normalizedPath);
}

async function readAsset(filePath) {
  try {
    return await readFile(filePath);
  } catch (error) {
    if (error.code !== 'ENOENT' && error.code !== 'EISDIR') {
      throw error;
    }

    return null;
  }
}

export async function handler(event) {
  const requestedFile = resolveRequestedFile(event?.rawPath);

  if (!requestedFile) {
    return {
      statusCode: 400,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
      body: 'Bad request',
    };
  }

  let filePath = requestedFile;
  let asset = await readAsset(filePath);

  if (!asset) {
    filePath = join(rootDirectory, 'index.html');
    asset = await readAsset(filePath);
  }

  if (!asset) {
    return {
      statusCode: 500,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
      body: 'Frontend files are unavailable.',
    };
  }

  const extension = extname(filePath).toLowerCase();
  const isHtml = extension === '.html';

  return {
    statusCode: 200,
    headers: {
      'content-type': contentTypes[extension] || 'application/octet-stream',
      'cache-control': isHtml
        ? 'no-cache'
        : 'public, max-age=31536000, immutable',
    },
    isBase64Encoded: true,
    body: asset.toString('base64'),
  };
}
