// Use relative paths for static hosting (GitHub Pages) or API for local dev
const isProduction = import.meta.env.PROD;
const API_BASE = isProduction ? '/data' : '/api';
const FILE_EXT = isProduction ? '.json' : '';

export async function fetchProfile() {
  const response = await fetch(`${API_BASE}/profile${FILE_EXT}`);
  if (!response.ok) throw new Error('Failed to fetch profile');
  return response.json();
}

export async function fetchProjects() {
  const response = await fetch(`${API_BASE}/projects${FILE_EXT}`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
}

export async function fetchProject(id) {
  // In production, we fetch all projects and filter
  const projects = await fetchProjects();
  const project = projects.find(p => p.id === id);
  if (!project) throw new Error('Failed to fetch project');
  return project;
}

export async function fetchBlogs() {
  const response = await fetch(`${API_BASE}/blogs${FILE_EXT}`);
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
}

export async function fetchBlog(slug) {
  // In production, we fetch all blogs and filter
  const blogs = await fetchBlogs();
  const blog = blogs.find(b => b.slug === slug);
  if (!blog) throw new Error('Failed to fetch blog');
  return blog;
}

export async function fetchAchievements() {
  const response = await fetch(`${API_BASE}/achievements${FILE_EXT}`);
  if (!response.ok) throw new Error('Failed to fetch achievements');
  return response.json();
}
