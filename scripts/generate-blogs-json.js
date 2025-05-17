// scripts/generate-blogs-json.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsDir = path.join(__dirname, '../blogs');
const outputFile = path.join(__dirname, '../blogs.json');

// Helper function to extract metadata from markdown file content
function extractMetadata(content) {
  const lines = content.split('\n').slice(0, 10); // check first 10 lines
  let title = '';
  let category = '';
  let description = '';

  for (const line of lines) {
    if (line.toLowerCase().startsWith('title:')) {
      title = line.slice(6).trim();
    } else if (line.toLowerCase().startsWith('category:')) {
      category = line.slice(9).trim();
    } else if (line.toLowerCase().startsWith('description:')) {
      description = line.slice(12).trim();
    }
  }

  return { title, category, description };
}

// Recursively scan blogs directory for markdown files
async function scanMarkdownFiles(dir) {
  let results = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await scanMarkdownFiles(fullPath);
      results = results.concat(nested);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

async function generateBlogsJson() {
  try {
    const files = await scanMarkdownFiles(blogsDir);
    const blogs = [];

    for (const filePath of files) {
      const content = await fs.readFile(filePath, 'utf-8');
      const metadata = extractMetadata(content);

      if (!metadata.title || !metadata.category) {
        console.warn(`Skipping file with missing title or category: ${filePath}`);
        continue;
      }

      // Get relative POSIX-style path starting from project root
      const relativePath = path.relative(path.join(__dirname, '..'), filePath).split(path.sep).join('/');

      blogs.push({
        title: metadata.title,
        category: metadata.category,
        description: metadata.description,
        file: `./${relativePath}`,
      });
    }

    // Write JSON to output file
    await fs.writeFile(outputFile, JSON.stringify(blogs, null, 2), 'utf-8');
    console.log(`Generated ${outputFile} with ${blogs.length} blog entries.`);
  } catch (err) {
    console.error('Error generating blogs.json:', err);
  }
}

// Run the generator
generateBlogsJson();
