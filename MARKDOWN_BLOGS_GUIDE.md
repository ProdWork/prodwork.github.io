# Markdown Blogs System Guide

## Overview
Your blog system has been successfully migrated from JSON to individual Markdown files. This provides better developer experience, hot-reload functionality on localhost, and easier content management.

## 📂 File Structure
```
public/blogs/
├── consulting-to-product-transition.md
├── blockchain-pilots-why-they-fail.md
├── building-trust-data-sharing-platforms.md
├── ... (22 total blog files)
```

Each file contains YAML frontmatter followed by Markdown content.

## ✏️ How to Edit a Blog

### 1. Open a blog file in VS Code
Example: `public/blogs/consulting-to-product-transition.md`

### 2. Edit the content
The file structure is:
```markdown
---
id: 2
slug: consulting-to-product-transition
title: "From Consulting to Product: What Actually Changes"
date: 2019-07-07
excerpt: "What shifts when you move from advising on strategy to owning real product outcomes."
readTime: "6 min read"
category: "Career"
tags: ["Consulting", "Product Management", "Career"]
featured: false
heroImage: "/data/blog-images/consulting-to-product-transition.jpg"
---

Your markdown content goes here. You can use standard markdown syntax:
- **Bold text**
- *Italic text*
- ## Headings
- [Links](https://example.com)
- etc.
```

### 3. Hot-reload on localhost
When running `npm run dev`:
1. Edit any `.md` file in `public/blogs/`
2. Save the file
3. Your browser will automatically refresh with the changes
4. No need to restart the server!

## 📝 Adding a New Blog

### 1. Create a new `.md` file in `public/blogs/`
Example: `public/blogs/my-new-blog.md`

### 2. Add the frontmatter
```markdown
---
id: 23
slug: my-new-blog
title: "My New Blog Title"
date: 2026-01-21
excerpt: "A brief excerpt for the blog listing page"
readTime: "5 min read"
category: "Product"
tags: ["tag1", "tag2", "tag3"]
featured: false
heroImage: "/data/blog-images/your-image.jpg"
---

Your blog content in Markdown format...
```

### Important fields:
- **id**: Unique number (must be higher than existing blogs)
- **slug**: URL-friendly name (use hyphens, no spaces)
- **date**: YYYY-MM-DD format
- **readTime**: Estimated reading time
- **category**: One of your existing categories
- **tags**: Array of topic tags
- **featured**: true/false (shows on home page)
- **heroImage**: Path to the blog's header image

### 3. Deploy
Run:
```bash
npm run build
npx gh-pages -d dist
```

## 🔧 How It Works

### Frontend Processing
1. `src/services/api.js` uses `import.meta.glob()` to load all `.md` files at build time
2. Each file's YAML frontmatter is parsed
3. Markdown content is converted to HTML using the `marked` library
4. All blogs are sorted by date (newest first)

### Vite Configuration
`vite.config.js` is configured to watch:
- All files in `src/`
- All `.md` files in `public/blogs/`

This ensures hot-reload works when you edit blog files.

## 📦 Dependencies Added
- **marked**: Converts Markdown to HTML
- **gray-matter**: Parses YAML frontmatter (built-in Vite parsing)

## 🚀 Development Workflow

### Local Development
```bash
npm run dev
# Server runs on localhost:3001 (or 3000 if available)
# Edit any .md file and see changes instantly
```

### Build & Deploy
```bash
npm run build    # Creates optimized dist/ folder
npx gh-pages -d dist  # Deploys to GitHub Pages
```

## ✅ Current Blogs
All 22 existing blogs have been converted from JSON to Markdown:
1. consulting-to-product-transition
2. blockchain-pilots-why-they-fail
3. building-trust-data-sharing-platforms
4. health-insurance-product-lessons
5. real-time-data-regulated-systems
6. zero-to-pilot-eight-months
7. definition-of-done-leadership-tool
8. supplier-onboarding-product-problem
9. enterprise-integrations-hard-truths
10. products-that-survive-governance
11. scaling-trustyoursupplier
12. launching-government-platform
13. roadmaps-and-dependencies
14. iam-hidden-complexity
15. day0-day1-day2-experiences
16. reducing-onboarding-time
17. platform-pm-delivery-mindset
18. using-ai-tools-as-pm
19. ai-agents-product-teams
20. building-platforms-banks-trust
21. senior-product-calm-execution
22. customer-identity-privacy-consent-evolution

## 🎯 Key Improvements

✅ **Hot-reload works!** Edit markdown files and see changes instantly on localhost
✅ **Better DX** Edit content in your favorite markdown editor
✅ **Cleaner code** No more managing large JSON files
✅ **Easier versioning** Each blog is its own file
✅ **Standard format** Uses YAML frontmatter (industry standard)

## 📋 Markdown Syntax Quick Reference

```markdown
# H1 Heading
## H2 Heading
### H3 Heading

**Bold text**
*Italic text*
***Bold italic***

- Bullet point
- Another point
  - Nested point

1. Numbered list
2. Second item

[Link text](https://example.com)

![Alt text](/path/to/image.jpg)

> Blockquote text

`inline code`

\`\`\`
code block
\`\`\`
```

## 🆘 Troubleshooting

### Changes aren't showing on localhost
- Check that Vite is running (`npm run dev`)
- Make sure you're editing files in `public/blogs/`
- Verify the filename has `.md` extension

### Build fails
- Check for syntax errors in `.md` files
- Verify YAML frontmatter is valid
- Make sure all required frontmatter fields are present

### Hot-reload not working
- Kill the dev server (Ctrl+C) and restart with `npm run dev`
- Check Vite watch configuration in `vite.config.js`

## 📞 Questions?
The system is designed to be straightforward:
1. Each blog = one `.md` file
2. Edit → Save → Instant preview on localhost
3. Build & deploy when ready
4. No JSON editing needed!

Enjoy your new Markdown-based blog system! 🎉
