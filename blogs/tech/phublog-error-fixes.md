title: Common Errors in Building PhuBlog & How to Fix Them
category: Development
description: A detailed guide covering common errors faced while building the PhuBlog project and step-by-step solutions to fix them.

---

# Common Errors in Building PhuBlog & How to Fix Them

Building PhuBlog involves multiple technologies such as Node.js, GitHub Actions, JavaScript, CSS, and GitHub Pages. During development, several errors and issues can arise. This guide outlines common problems and how to resolve them efficiently.

---

## 1. ReferenceError: require is not defined in ES module scope

**Cause:** Using `require()` in a Node.js project configured for ES modules (`"type": "module"` in `package.json`).

**Fix:**

- Replace `require()` with `import` syntax:
  ```js
  import fs from 'fs';
  ```

```
* Or rename script files to `.cjs` to use CommonJS.
* Alternatively, remove `"type": "module"` from `package.json`.

---

## 2. GitHub Actions Ignores `blogs.json` Due to `.gitignore`

**Cause:** `blogs.json` is listed in `.gitignore` so Git won’t add it, causing workflow commit failures.

**Fix:**

* Remove or comment out `blogs.json` from `.gitignore`.
* Use `git add -f blogs.json` to force add.
* Update your GitHub Actions workflow to force add ignored files.

---

## 3. Workflow Not Triggering on Push

**Cause:** Workflow triggers are misconfigured.

**Fix:**

* Ensure `on: push` in `.github/workflows/main.yml` includes relevant branches and paths.
* Example:
  ```yaml
  on:
    push:
      branches:
        - main
      paths:
        - 'blogs/**'
        - 'scripts/**'
```

* Temporarily remove `paths` to debug.

---

## 4. Blog Content Fails to Load (“Failed to load blog”)

**Cause:** Incorrect or inaccessible file paths; CORS issues when opening files locally.

**Fix:**

* Verify `blogs.json` contains correct relative POSIX-style paths (`./blogs/filename.md`).
* Test on a local server (e.g., `live-server`) or deploy to GitHub Pages.
* Ensure fetch URLs are constructed properly.

---

## 5. Search Not Working Properly

**Cause:** Case sensitivity or missing event binding.

**Fix:**

* Normalize search input and blog text to lowercase for case-insensitive matching.
* Attach `input` event listeners properly to update displayed blogs dynamically.

---

## 6. Home Page Missing Recent, Top Posts or Categories

**Cause:** Missing or incorrect metadata in `blogs.json`.

**Fix:**

* Confirm all blog entries have necessary fields (`date`, `popularity`, `category`).
* Check sorting/grouping logic in JavaScript.

---

## 7. Navbar Links Not Working

**Cause:** Incorrect `href` attributes or missing files.

**Fix:**

* Verify correct paths (e.g., `index.html`, `about.html`).
* Ensure those files exist in repo root.
* Use JavaScript navigation for SPA behavior if desired.

---

## 8. Back to Home Link Not Working in Blog View

**Cause:** Missing event handler or incorrect link.

**Fix:**

* Add click event on back link/button to toggle views or redirect to `index.html`.
* Use consistent IDs/classes for UI elements.

---

## 9. CSS Styling Not Applying or Inconsistent

**Cause:** Missing stylesheet includes or conflicting styles.

**Fix:**

* Link the common `style.css` in all HTML files.
* Use modular CSS with clear selectors to avoid conflicts.

---

## 10. Floating Navbar Misbehaving

**Cause:** CSS position or z-index issues.

**Fix:**

* Use `position: fixed; top: 0; width: 100%; z-index: 1000;` for navbar.
* Add padding-top to main content equal to navbar height.

---

## 11. GitHub Pages 404 or Path Errors

**Cause:** Incorrect file paths or missing `.nojekyll`.

**Fix:**

* Use relative POSIX-style paths in JSON and fetch calls.
* Add an empty `.nojekyll` file at repo root.
* Configure GitHub Pages base URL if project site.

---

# Conclusion

Troubleshooting these issues will make your PhuBlog project smooth and reliable. Use browser dev tools, test locally, and check GitHub Actions logs to debug effectively. Happy blogging!

---

*— PhuBlog Development Team*


