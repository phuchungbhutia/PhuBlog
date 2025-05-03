// Sample data for blog posts 
const blogPosts = [
    {
      "title": "Setting Up PhuBlog",
      "url": "/posts/phublog-setup.html",
      "category": "tutorials",
      "tags": ["GitHub Pages", "Jekyll"],
      "date": "2025-05-01",
      "views": 500,
      "content": "Learn how to set up PhuBlog with GitHub Pages and Jekyll."
    },
    {
      "title": "Customizing Jekyll Themes",
      "url": "/posts/jekyll-themes.html",
      "category": "tech",
      "tags": ["Jekyll", "Themes", "Customization"],
      "date": "2025-04-20",
      "views": 1200,
      "content": "Explore various Jekyll themes and learn how to customize your blog design."
    },
    {
      "title": "Best Git Commands",
      "url": "/posts/git-commands.html",
      "category": "tech",
      "tags": ["Git", "Version Control"],
      "date": "2025-03-15",
      "views": 800,
      "content": "Essential Git commands for developers to manage code efficiently."
    }
  ];
  
  // Build the Lunr.js index
  const lunrIndex = lunr(function () {
    this.ref("url");
    this.field("title");
    this.field("content");
    this.field("category");
    this.field("tags");
  
    blogPosts.forEach(doc => this.add(doc));
  });
  
  function searchBlog() {
    let query = document.getElementById("searchBox").value.toLowerCase();
    let filter = document.getElementById("filter").value;
    let resultsList = document.getElementById("results");
    resultsList.innerHTML = "";
  
    let results = lunrIndex.search(query);
    // Loop through Lunr search results
    results.forEach(match => {
      let post = blogPosts.find(p => p.url === match.ref);
  
      // Apply additional filters:
      let matchesFilter = (filter === "all") ||
                          (filter === "latest" && post.date > "2025-04-01") ||
                          (filter === "popular" && post.views > 800) ||
                          (post.category.toLowerCase() === filter);
  
      if (matchesFilter) {
        let li = document.createElement("li");
        li.innerHTML = `<a href="${post.url}">${post.title}</a> (${post.category} - ${post.date})`;
        li.classList.add("fade-in");
        resultsList.appendChild(li);
      }
    });
  }
  