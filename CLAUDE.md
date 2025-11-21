# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An academic website for Prof. Karim Anaya-Izquierdo with a VSCode-themed UI. The entire website mimics a code editor where each section appears as a different programming language file (Python, R, LaTeX, YAML, Quarto).

**Tech Stack**: React 19, TypeScript, Vite, Bootstrap 5, React Router v7, SASS

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
vite build

# Preview production build
npm run preview
```

## Architecture

### VSCode-Themed Layout System

The application uses a custom VSCode-like layout with these key components:

- **TabManager** (`src/components/TabManager.tsx`): Core state management component that controls all open tabs, navigation, and synchronization between URL paths and tabs. Uses render props pattern to pass tab state to children.
- **ActivityBar**: Left-most vertical bar with icons
- **PrimarySideBar**: Next to ActivityBar, shows navigation icons for each section
- **TopTabsBar**: Displays open tabs with close buttons (home tab cannot be closed)
- **CommandPalette**: Quick navigation (Cmd/Ctrl + Shift + P)
- **Main content area**: Renders pages as "code files"

### Context Providers

Context providers wrap the app in this order (see `src/main.tsx`):
1. **BrowserRouter**: React Router navigation
2. **HeadProvider**: react-head for meta tags
3. **ThemeProvider** (`src/context/ThemeContext.tsx`): Dark/light theme with localStorage persistence
4. **SearchProvider** (`src/context/SearchContext.tsx`): Command palette visibility and search term state

### Tab System

Tabs are defined in `TabManager.tsx` with:
- `id`: Unique identifier
- `name`: Display name (e.g., "home.py", "about.py", "blog.qmd")
- `path`: React Router path
- `language`: Used for syntax highlighting

The TabManager handles:
- Opening tabs when clicking navigation items
- Syncing tabs with URL changes (browser back/forward)
- Creating dynamic blog post tabs (e.g., `blog-post-title.qmd`)
- Closing tabs (activating previous tab or falling back to home)
- URL changes automatically open corresponding tabs

### Page File Naming Convention

Each page mimics a file in a specific programming language:
- Home: `home.py` (Python)
- About: `about.py` (Python)
- Blog: `blog.qmd` (Quarto)
- Publications: `publications.R` (R)
- Projects: `projects.R` (R)
- Current Courses: `current_courses.tex` (LaTeX)
- Past Courses: `past_courses.tex` (LaTeX)
- Contact: `contact.yaml` (YAML)

## Blog Post System

Blog posts are written in Quarto (`.qmd`) and processed via a bash script:

1. **Write**: Create `.qmd` files in `_quarto_source/` with YAML frontmatter:
   ```yaml
   ---
   title: "Post Title"
   date: "2025-11-15"
   description: "Brief summary"
   categories: ["tutorial", "python"]
   ---
   ```

2. **Publish**: Run `./publish_post.sh _quarto_source/your-post.qmd`
   - Renders QMD to HTML
   - Moves HTML to `posts/`
   - Moves assets to `public/{postname}_files/`
   - Fixes asset paths automatically

3. **Display**:
   - `Blog.tsx` uses `import.meta.glob()` to dynamically load QMD files
   - Parses YAML headers for metadata
   - `BlogPostPage.tsx` renders individual posts
   - Dynamic tabs created for blog posts with format `blog-{postId}.qmd`

See `HOW_TO_ADD_BLOG_POSTS.md` for detailed instructions.

## Code Syntax Highlighting

The `CodeBlock` component (`src/components/CodeBlock.tsx`) uses `react-syntax-highlighter` with:
- Prism + atomDark theme
- Custom line numbers
- Optional extended line numbers to fill vertical space
- Jupyter notebook mode toggle
- Supports: Python, R, LaTeX, YAML, QMD

## Data Management

- **Publications**: `data/publications.json` (also `publications.csv`)
- **Images**: `public/images/`
- **Blog assets**: Auto-generated in `public/{postname}_files/`

## Routing Structure

```
/ → Home (home.py)
/about → About (about.py)
/blog → Blog listing (blog.qmd)
/blog/:postId → Individual blog post (dynamic: {postId}.qmd)
/research → Research landing
/research/projects → Projects (projects.R)
/research/publications → Publications (publications.R)
/teaching/current-courses → Current courses (current_courses.tex)
/teaching/past-courses → Past courses (past_courses.tex)
/contact → Contact (contact.yaml)
```

## Styling

- SASS files in `src/` directory (`.scss`)
- Dark mode by default (controlled via ThemeContext)
- JetBrains Mono font for code theme
- Bootstrap 5 grid system
- VSCode color scheme (dark grey, blue status bar)

## Key Implementation Details

1. **Tab/URL Synchronization**: Two useEffect hooks in TabManager handle bidirectional sync between tabs and URLs
2. **Dynamic Blog Imports**: Vite's `import.meta.glob()` enables dynamic QMD file loading at build time
3. **Render Props Pattern**: TabManager uses children as a function to pass state without Context API overhead
4. **Home Tab Protection**: Home tab (`id: 'home'`) cannot be closed and serves as fallback

## Deployment

- Hosted on Netlify
- Auto-deploys on push to main branch
- Build command: `vite build`
- Publish directory: `dist`

## Contact Information

- Name: Prof. Karim AI (Anaya-Izquierdo)
- Email: kai21@bath.ac.uk
- University: University of Bath, Mathematical Sciences
- GitHub: https://github.com/kanayai
