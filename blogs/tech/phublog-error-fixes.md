title: Common Errors in Building PhuBlog & How to Fix Them
date: 2025-05-17
categories:Development
description: A comprehensive guide to common errors encountered while building the PhuBlog project, with clear explanations and step-by-step fixes.

---

# Common Errors in Building PhuBlog & How to Fix Them

Building a blog site like **PhuBlog** involves multiple moving parts—Node.js scripts, GitHub Actions workflows, fetching markdown files, styling with CSS, and deploying on GitHub Pages. Along the way, you may encounter various errors and bugs. This guide compiles the most common issues you might face during development and how to resolve them efficiently.

---

## 1. ReferenceError: require is not defined in ES module scope

### Problem

Your Node.js script throws this error when using `require()` because the project is configured to use ES modules (`"type": "module"` in `package.json`).

### Solution

- Convert the script to ES module syntax:
  ```js
  import fs from 'fs';
  ```

```
* Or rename your script file extension to `.cjs` to use CommonJS.
* Alternatively, remove `"type": "module"` from `package.json` to revert to CommonJS.

---

## 2. GitHub Actions ignoring `blogs.json` due to `.gitignore`

### Problem

Git refuses to commit `blogs.json` because it’s listed or matched by patterns in `.gitignore`.

### Solution

* Remove or comment out `blogs.json` in `.gitignore`.
* If you need to keep ignoring generally but commit this file explicitly, use:
  ```bash
  git add -f blogs.json
```

* Modify your GitHub Actions workflow to force-add ignored files during commit.

---

## 3. Workflow Not Triggering on Push

### Problem

Your GitHub Actions workflow does not run after pushing code changes.

### Solution

* Ensure your workflow `on` section covers all relevant branches and paths:
  ```yaml
  on:
    push:
      branches:
        - main
      paths:
        - 'blogs/**'
        - 'scripts/**'
  ```
* Remove path filters temporarily to test trigger.

---

## 4. Blog Content Fails to Load ("Failed to load blog" Message)

### Problem

Clicking on a blog link shows an error or fails to fetch the markdown content.

### Solution

* Verify `blogs.json` contains correct relative paths with POSIX slashes (`./blogs/filename.md`).
* Confirm your fetch URLs are constructed correctly and accessible.
* Deploy to GitHub Pages or use a local server (`live-server`) to avoid CORS and local file protocol issues.

---

## 5. Search Not Working Properly

### Problem

Search bar does not filter blogs as expected.

### Solution

* Bind event listeners properly to the search input.
* Normalize search and blog text to lowercase for case-insensitive matching.
* Update the blog list DOM dynamically on input events.

---

## 6. Home Page Missing Recent, Top Posts, or Categories

### Problem

Sections on the home page are empty or missing data.

### Solution

* Confirm `blogs.json` loads correctly.
* Ensure each blog entry includes required metadata such as `date`, `popularity`, and `category`.
* Implement sorting and grouping logic in JavaScript correctly.

---

## 7. Navbar Links Not Working

### Problem

Navigation links (Home, Categories, About, Contact) do nothing or cause errors.

### Solution

* Verify correct `href` attributes, e.g., `index.html`, `about.html`.
* Ensure linked HTML pages exist at correct locations.
* For single-page navigation, add appropriate JavaScript handlers.

---

## 8. Back to Home Link Not Functioning in Blog View

### Problem

No way to return to the main blog list after opening a post.

### Solution

* Add event handler to back button to toggle views or navigate to `index.html`.
* Use clear and consistent IDs/classes for toggling visibility.

---

## 9. CSS Styling Not Applying or Inconsistent

### Problem

Pages lack styling or have different appearances.

### Solution

* Include a common CSS file (`style.css`) in all HTML files.
* Avoid conflicting CSS selectors.
* Structure styles for navbar, content, blog view in one stylesheet.

---

## 10. Floating Navbar Misbehaving

### Problem

Navbar does not stick to the top or overlaps content.

### Solution

* Use CSS `position: fixed; top: 0; width: 100%; z-index: 1000;`.
* Add padding or margin to the top of the main content so it is not hidden behind the navbar.

---

## 11. GitHub Pages 404 or Path Errors

### Problem

Markdown files or assets fail to load on GitHub Pages.

### Solution

* Check that file paths in JSON and fetch calls are relative and correct.
* Add an empty `.nojekyll` file to the root directory.
* Configure GitHub Pages base URL correctly if using a project site.

---

# Final Tips

* Use browser dev tools (`Console` and `Network`) to debug fetch errors and DOM updates.
* Test your site locally on a static server to avoid file protocol restrictions.
* Regularly commit and push changes with descriptive messages.
* Use GitHub Actions logs for CI/CD troubleshooting.

---

Building PhuBlog was a great learning journey. Facing and fixing these errors will make your project robust and maintainable. Happy coding!

---

*If you have any questions or need help, feel free to reach out or open an issue in the repository.*

---

*— PhuBlog Team*


