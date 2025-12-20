// Load data from local JSON files
const API_BASE = '/data';

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
  const response = await fetch(`${API_BASE}/blogs.json`);
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
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
