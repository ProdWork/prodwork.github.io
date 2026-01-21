import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read blogs.json
const blogsJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'data', 'blogs.json'), 'utf8'));

// Create blogs directory if it doesn't exist
const blogsDir = path.join(__dirname, 'public', 'blogs');
if (!fs.existsSync(blogsDir)) {
  fs.mkdirSync(blogsDir, { recursive: true });
}

// Convert each blog to markdown
blogsJson.forEach((blog) => {
  const frontmatter = `---
id: ${blog.id}
slug: ${blog.slug}
title: "${blog.title}"
date: ${blog.date}
excerpt: "${blog.excerpt.replace(/"/g, '\\"')}"
readTime: "${blog.readTime}"
category: "${blog.category}"
tags: [${blog.tags.map(t => `"${t}"`).join(', ')}]
featured: ${blog.featured}
heroImage: "${blog.heroImage}"
---

`;

  const content = frontmatter + blog.content;
  const filename = `${blog.slug}.md`;
  const filepath = path.join(blogsDir, filename);

  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`✓ Created ${filename}`);
});

console.log(`\n✅ Successfully converted ${blogsJson.length} blogs to Markdown!`);
