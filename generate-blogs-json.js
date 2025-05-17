const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, '..', 'blogs');
const outputFile = path.join(__dirname, '..', 'blogs.json');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  });
  return results;
}

function parseMetadata(content) {
  // Extract title, category, description from first lines like:
  // title: ...
  // category: ...
  // description: ...
  const lines = content.split(/\r?\n/);
  let metadata = {};
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const line = lines[i].trim();
    if (line.startsWith('title:')) metadata.title = line.slice(6).trim();
    else if (line.startsWith('category:')) metadata.category = line.slice(9).trim();
    else if (line.startsWith('description:')) metadata.description = line.slice(12).trim();
  }
  return metadata;
}

function main() {
  const mdFiles = walkDir(blogsDir);
  const blogs = mdFiles.map(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const metadata = parseMetadata(content);
    const relativePath = './' + path.posix.join('blogs', path.relative(blogsDir, filePath).split(path.sep).join('/'));
    return {
      title: metadata.title || 'Untitled',
      category: metadata.category || 'Uncategorized',
      description: metadata.description || '',
      file: relativePath
    };
  });

  // Sort blogs by title for consistency
  blogs.sort((a,b) => a.title.localeCompare(b.title));

  fs.writeFileSync(outputFile, JSON.stringify(blogs, null, 2), 'utf-8');
  console.log(`Generated blogs.json with ${blogs.length} entries.`);
}

main();
