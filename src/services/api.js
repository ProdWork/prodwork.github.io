import { marked } from 'marked';

// Load data from local JSON files
const API_BASE = '/data';

// Parse YAML frontmatter from markdown
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { metadata: {}, content: '' };

  const frontmatterStr = match[1];
  const markdown = match[2];

  // Simple YAML parser for our frontmatter
  const metadata = {};
  const lines = frontmatterStr.split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    const [key, ...valueParts] = line.split(':');
    let value = valueParts.join(':').trim();

    // Handle different value types
    if (value === 'true') value = true;
    else if (value === 'false') value = false;
    else if (value.startsWith('[') && value.endsWith(']')) {
      // Parse array
      value = value
        .slice(1, -1)
        .split(',')
        .map(v => v.trim().replace(/^["']|["']$/g, ''));
    } else if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    metadata[key.trim()] = value;
  }

  return { metadata, markdown };
}

// Cache for blogs
let blogsCache = null;
let blogsCacheTime = 0;
const CACHE_TTL = 60000; // 1 minute cache

export async function fetchProfile() {
  const response = await fetch(`${API_BASE}/profile.json`);
  if (!response.ok) throw new Error('Failed to fetch profile');
  return response.json();
}

export async function fetchProjects() {
  const response = await fetch(`${API_BASE}/projects.json`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
}

export async function fetchProject(id) {
  const projects = await fetchProjects();
  const project = projects.find(p => p.id === id);
  if (!project) throw new Error('Failed to fetch project');
  return project;
}

export async function fetchBlogs() {
  // Check cache
  const now = Date.now();
  if (blogsCache && now - blogsCacheTime < CACHE_TTL) {
    return blogsCache;
  }

  // Parse markdown files from blogs directory
  // This uses Vite's import.meta.glob which is processed at build time
  const modules = import.meta.glob('/src/blogs/*.md', { query: '?raw', import: 'default' });
  const blogs = [];

  for (const [filepath, importFn] of Object.entries(modules)) {
    try {
      const mdContent = await importFn();
      const { metadata, markdown } = parseFrontmatter(mdContent);
      const htmlContent = marked(markdown);

      blogs.push({
        ...metadata,
        content: htmlContent,
        markdown: markdown,
      });
    } catch (error) {
      console.error(`Failed to parse blog at ${filepath}:`, error);
    }
  }

  // Sort by date descending
  blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  blogsCache = blogs;
  blogsCacheTime = now;
  return blogs;
}

export async function fetchBlog(slug) {
  const blogs = await fetchBlogs();
  const blog = blogs.find(b => b.slug === slug);
  if (!blog) throw new Error('Failed to fetch blog');
  return blog;
}

export async function fetchAchievements() {
  const response = await fetch(`${API_BASE}/achievements.json`);
  if (!response.ok) throw new Error('Failed to fetch achievements');
  return response.json();
}

export async function fetchSocial() {
  const response = await fetch(`${API_BASE}/social.json`);
  if (!response.ok) throw new Error('Failed to fetch social links');
  return response.json();
}
