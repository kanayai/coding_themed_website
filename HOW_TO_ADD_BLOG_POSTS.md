# How to Add Blog Posts

This guide explains the new, automated workflow for adding blog posts to your website using Quarto.

## The Workflow

The process is now managed by a script that handles file generation, path fixing, and moving files to the correct directories. Your main job is to write the post in a Quarto (`.qmd`) file.

1.  **Write:** Create a `.qmd` file in the `_quarto_source` directory.
2.  **Publish:** Run the `./publish_post.sh` script on your file.
3.  **Commit:** Commit the newly generated files to your Git repository.

## Step-by-Step Instructions

### 1. Create a New Quarto File

All blog post source files live in the `_quarto_source` directory.

Navigate to `_quarto_source` and create a new file with a `.qmd` extension (e.g., `_quarto_source/my-awesome-post.qmd`).

### 2. Write Your Post with Frontmatter

At the top of your new `.qmd` file, you must include a "frontmatter" section. This is where you define the post's metadata.

```yaml
---
title: "My Awesome Post Title"
date: "2025-11-15"
description: "This is a short summary of the post that will appear in the blog list."
keywords: ["quarto", "r", "python", "tutorial"]
---

## Your Post Content Starts Here

Write your post content using Markdown. You can include code blocks, images, and anything else Quarto supports.

```{r}
# Example R code block
print("Hello from Quarto!")
```

When you include images, the script will handle the paths for you, so you can use standard Quarto syntax.
```

**Required Frontmatter Fields:**

*   `title`: The title of your blog post.
*   `date`: The publication date in `YYYY-MM-DD` format.
*   `description`: A short excerpt or summary of your post.

**Optional Frontmatter Fields:**

*   `keywords`: A list of tags for your post.

### 3. Run the Publish Script

Once you have saved your `.qmd` file, open your terminal in the root directory of the project and run the `publish_post.sh` script, passing the path to your new file as an argument.

```bash
./publish_post.sh _quarto_source/my-awesome-post.qmd
```

The script will automatically:
1.  Render your `.qmd` file into HTML.
2.  Move the final `.html` file to the `posts` directory.
3.  If any images or assets were generated (in a `_files` directory), it will move them to the `public` directory and fix the paths in your HTML file.

### 4. Commit Your Changes

After the script runs successfully, you will have new files in the `posts` and/or `public` directories. The final step is to commit these new files to your Git repository.

```bash
# Check which new files were created
git status

# Add the new files
git add posts/my-awesome-post.html
git add public/my-awesome-post_files/

# Commit them
git commit -m "feat: Add 'My Awesome Post' blog post"

# Push to the remote repository
git push
```

That's it! Your new post will be live once Netlify finishes building the site.