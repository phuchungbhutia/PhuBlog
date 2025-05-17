// scripts/generate-blogs-json.js

import { readdir, readFile, writeFile, stat } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Helpers for __dirname (because we're in ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root path to blogs folder
const blogsDir = path.resolve(__dirname, '../blogs');
const outputPath = path.resolve(__dirname, '../blogs.json');

async function getMarkdownFiles(dir) {
  let files = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nestedFiles = await getMarkdownFiles(fullPath);
      files = files.concat(nestedFiles);
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractMetadata(content) {
  const lines = content.split('\n').slice(0, 10); // Check first 10 lines
  const meta = {};
  for (const line of lines) {
    if (line.startsWith('title:')) meta.title = line.replace('title:', '').trim();
    if (line.startsWith('category:')) meta.category = line.replace('category:', '').trim();
    if (line.startsWith('description:')) meta.description = line.replace('description:', '').trim();
  }
  return meta.title && meta.category && meta.description ? meta : null;
}

function toPosixPath(p) {
  return p.split(path.sep).join(path.posix.sep);
}

async function generateJSON() {
  const mdFiles = await getMarkdownFiles(blogsDir);
  const blogs = [];

  for (const file of mdFiles) {
    const content = await readFile(file, 'utf-8');
    const metadata = extractMetadata(content);

    if (metadata) {
      const relativePath = path.relative(path.resolve(__dirname, '..'), file);
      blogs.push({
        ...metadata,
        file: './' + toPosixPath(relativePath),
      });
    }
  }

  await writeFile(outputPath, JSON.stringify(blogs, null, 2), 'utf-8');
  console.log(`✅ blogs.json generated with ${blogs.length} entries.`);
}

generateJSON().catch(err => {
  console.error('❌ Failed to generate blogs.json:', err);
  process.exit(1);
});
