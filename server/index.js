const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Helper function to load JSON data fresh from file
const loadData = (filename) => {
  const filePath = path.join(__dirname, 'data', `${filename}.json`);
  delete require.cache[require.resolve(filePath)];
  return require(filePath);
};

// Helper function to save JSON data to file
const saveData = (filename, data) => {
  const filePath = path.join(__dirname, 'data', `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// API Routes
app.get('/api/profile', (req, res) => {
  res.json(loadData('profile'));
});

app.get('/api/projects', (req, res) => {
  res.json(loadData('projects'));
});

app.get('/api/projects/:id', (req, res) => {
  const projects = loadData('projects');
  const project = projects.find(p => p.id === req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

app.get('/api/blogs', (req, res) => {
  res.json(loadData('blogs'));
});

app.get('/api/blogs/:slug', (req, res) => {
  const blogs = loadData('blogs');
  const blog = blogs.find(b => b.slug === req.params.slug);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

app.get('/api/achievements', (req, res) => {
  res.json(loadData('achievements'));
});

// Admin API Routes - Update JSON files
app.put('/api/admin/profile', (req, res) => {
  try {
    saveData('profile', req.body);
    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/admin/projects', (req, res) => {
  try {
    saveData('projects', req.body);
    res.json({ success: true, message: 'Projects updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/admin/blogs', (req, res) => {
  try {
    saveData('blogs', req.body);
    res.json({ success: true, message: 'Blogs updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/admin/achievements', (req, res) => {
  try {
    saveData('achievements', req.body);
    res.json({ success: true, message: 'Achievements updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Puneet Portfolio API',
    endpoints: [
      'GET /api/profile',
      'GET /api/projects',
      'GET /api/projects/:id',
      'GET /api/blogs',
      'GET /api/blogs/:slug',
      'GET /api/achievements',
      'GET /api/health'
    ]
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
