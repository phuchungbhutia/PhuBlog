# PhuBlog

PhuBlog is a lightweight static blog platform powered by markdown files. It automatically generates a browsable, searchable blog website with categories, recent posts, top posts, and an elegant floating navigation bar. Ideal for personal blogging or small projects hosted on GitHub Pages.

---

## 🚀 Features

- Markdown-based blog posts organized in `/blogs/` subfolders by category
- Auto-generation of `blogs.json` metadata via a Node.js script
- Responsive, clean, and modern UI with floating fixed navigation bar
- Search bar with live filtering by blog title and description
- Sections for Recent Posts, Top Posts, and expandable Categories
- Inline blog viewer that loads and renders markdown content without page reload
- Separate About and Contact pages
- Fully static site, easy to host on GitHub Pages
- Automated GitHub Actions workflow to regenerate `blogs.json` on every push

---

## 📂 Folder Structure

```
PhuBlog/

├── .github/

│   └── workflows/

│       └── generate-blogs-json.yml        # GitHub Actions workflow

├── assets/

│   └── css/

│       └── style.css                      # Common CSS styles

├── blogs/                                # Markdown blog posts organized by category

│   ├── tech/

│   │   └── javascript-basics.md

│   ├── lifestyle/

│   │   └── morning-routine.md

│   └── how-to-use-git.md

├── scripts/

│   └── generate-blogs-json.js            # Node.js script to generate blogs.json

├── about.html                            # About page

├── contact.html                          # Contact page

├── index.html                           # Main blog listing page

├── blogs.json                          # Auto-generated blog metadata file (committed by workflow)

└── README.md                            # Project documentation
```

---

## 📝 How to Add Blogs

1. Add a new markdown file (`.md`) inside an appropriate category folder under `/blogs/`. For example, `blogs/tech/my-new-post.md`.
2. At the very top of the markdown file, include metadata as plain text (first 3-6 lines), for example:

```
title: My New Blog Post

category: Tech

description: A short summary about my new blog post.

date: 2025-05-17

popularity: 5
```

3. Write the blog content below the metadata.

---

## ⚙️ Running the Generator Script Locally

To generate or update `blogs.json` metadata locally:

1. Make sure you have Node.js installed.
2. Run the script from the project root:

```bash
node scripts/generate-blogs-json.js
```

3. This will scan all markdown files in `/blogs/` and create/update the `blogs.json` file.

---

## 🔄 GitHub Commit Workflow for Blogs

* Add or update markdown files in `/blogs/`.
* Commit your changes.
* Push to the `main` branch.
* GitHub Actions workflow will automatically run and update `blogs.json` in your repo.

---

## 🌐 GitHub Pages Hosting

You can host this blog on GitHub Pages by enabling it in your repo settings (usually `main` branch root).

Example blog link:

`https://phuchungbhutia.github.io/PhuBlog/`

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://chatgpt.com/c/LICENSE) file for details.

---

## 📫 Contact & Contributions

Feel free to open issues or pull requests for bug fixes, enhancements, or blog additions!

---


## 📊 GitHub Stats

![Phu's GitHub stats](https://github-readme-stats.vercel.app/api?username=phuchungbhutia&show_icons=true&theme=radical)

<!-- Optional: Top languages -->

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=phuchungbhutia&layout=compact&theme=radical)


---

Thank you for using PhuBlog! Happy blogging 🚀


