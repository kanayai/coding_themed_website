## Project:
My academic website

### Context
- Use Node-js, TypeScript, React and Bootstrap to build a modern academic website.

### GitHub Repository
- Repository name: coding_themed_website
- Repository URL: https://github.com/kanayai/coding_themed_website.git

### Sections
- Home
- About
- Blog
    - Articles
    - Tutorials
- Research
    - Projects
    - Publications
- Teaching
    - Current Courses
    - Past Courses
- Contact

### My contact Details

- **Name**: Prof. Karim AI (Anaya-Izquierdo)
- **Department**: Mathematical Sciences
- **University**: University of Bath, United Kingdom
- **Email**: kai21@bath.ac.uk
- **Office**: 4West 4.13, 
- **Address**: Claverton Down, BA2 7AY, Bath, United Kingdom

### User Interface Theme details

- Main UI theme is coding in 
    - Python (mainly Pandas,  Matplotlib, Polars, and Statsmodels), 
    - R (Mainly Tidyverse), 
    - LaTeX for academic articles writing
    - YAML for headers of Quarto Files.
- Website sections should look like the user is editing inside VScode with the following UI components:
    - Status bar at the bottom similar to VSCode (blue background with white text). Add containers for line/column number, language mode (e.g., Python, R, LaTeX, YAML), encoding (UTF-8), and Git branch (main). On the right side of the status bar, include links to my social media profiles using small icons.
    - Activity bar on the far left with typical VSCode icons (Explorer, Search, Source Control, Run and Debug, Extensions) (dark grey background with white icons) use this for the search functionality (magnifying glass icon), use this for the dark/light mode using a sun icon, also include the cog/settings icon at the bottom of the activity bar (no functionality yet but can be added later)
    - Primary side bar just next to the activity bar with icons for each website section (Home, About, Blog, Research, Teaching, Contact) similar to VSCode sidebar when the explorer is open 
    - No secondary sidebar
    - Main content area in the center with code editor like appearance. assume a file is open in the editor that corresponds to the section being viewed (e.g., about.py for the About section, blog.qmd for the Blog section, research.R for the Research section, teaching.tex for the Teaching section, contact.yaml for the Contact section)
    - top tabs bar above the main content area with tabs for each open section (e.g., about.py, blog.qmd, research.R, teaching.tex, contact.yaml) with a close button on each tab
    - upper section with command palette like appearance for quick navigation between sections (e.g., Ctrl+P to open the command palette and type the section name to navigate quickly), also inclide in the left the three dots as if we are MACOs  red, yellow, green buttons to close, minimize, and maximize the window 
- Specifics for each section:
    - Home Section:
        - Mimic a Python script file (home.py)
        - Include typical imports at the top (e.g., import os, import sys)
        - Welcome message and brief introduction as comments    
    - About Section:
        - Mimic a Python script file (about.py)
        - Include typical imports at the top (e.g., import os, import sys, import numpy as np, import pandas as pd)
        - Profile picture displayed as a comment block at the top
        - Biography and academic background as docstrings
    - Blog Section:
        - grid layout to display blog posts
        - Mimic a Quarto markdown file (blog.qmd)
        - YAML header at the top with title, author, date, and categories
        - List of blog posts as clickable cards with title, date, and short description
    - Research Section:
        - Mimic an R script file (research.R)
        - Include typical library imports at the top (e.g., library(tidyverse), library(ggplot2), library(dplyr))
        - List of research projects as comments
        - Publications formatted as a Tibble
    - Teaching Section:
        - Mimic a LaTeX file (teaching.tex)
        - Include typical LaTeX preamble at the top (e.g., \documentclass{article}, \usepackage{amsmath}, \usepackage{graphicx})
        - List of current and past courses as sections and subsections
    - Contact Section:
        - Mimic a YAML file (contact.yaml)
        - Include typical YAML structure with name, email, office, address, and social media links
        - email should be a clickable mailto link

- General UI/UX Guidelines:

- Each section should mimic the syntax highlighting and structure of the respective programming language
- Top of main website sections should look like typical top of script files in the indicated programming language 
- All UI components like buttons etc should match the theme of coding . Use short commands or functionms as button labels (e.g., "Run", "Submit", "Compile", "Render", "Push", "Commit", "Save", "Load", etc)
- Default to dark mode UI design and add toggle to light mode if user prefers light mode
- The website should have a clean and minimalistic design with a focus on readability and usability.
- For UI theme code use the JetBrains Mono font from https://www.jetbrains.com/lp/mono/
- The top of the website should have a navigation bar that looks more like the top of a Python script file with typical imports, that is import about, import blog, from research import publications, from research import projects, import teaching, import contact etc
- Default font size should be relatively large (16-18px) for better readability.
- The list of publications in the Research section should be formatted like a Tibble in R with a limit of 20 entries per page and pagination controls at the bottom. SEe publications.csv for data.


### Media and data

- Use pictures in the 'public/images' folder for profile pictures and other images on the website like backgrounds.
- List of publications is in 'data/publications.json'

### Responsive Layout
- Works on desktop, tablet, and mobile
- Bootstrap grid system for flexibility


### Easy Blog Management
- Write posts in Quarto (`.qmd`)
- A script automates publishing, file moving, and path fixing.
- Handles images and other assets automatically.
_ Use HOW_TO_ADD_BLOG_POSTS.md for more details.

### My socials
- Add social media links to the website footer but similar to bottom of vsCode window
- University of Bath Profile: https://researchportal.bath.ac.uk/en/persons/karim-anaya-izquierdo/
- GitHub: https://github.com/kanayai
- Orcid: https://orcid.org/0000-0001-9718-5256
- LinkedIn: www.linkedin.com/in/karim-anaya-izquierdo-b596bb2
- Google Scholar: https://scholar.google.com/citations?user=SrcprVQAAAAJ&hl=en

### Deployment

- Ensure automatic deployment on push to the main branch.
- Netlify is linked to Github for deployment

### Additional Features
- Search functionality across the website.
- SEO optimization for better visibility.
- Analytics integration to track visitor behavior.
- Accessibility features to ensure usability for all users.

### Maintenance Instructions

- Write instructions (MD files) for:
    - Adding new blog posts using Quarto (i.e. possibly modufy HOW_TO_ADD_BLOG_POSTS.md)
    - Updating research projects and publications.
    - Modifying teaching course details.
    - General website maintenance and updates.

### Future capabilities
- Multilingual support for a broader audience.
- Integration with academic databases for automatic publication updates.
- User accounts for personalized experiences.
- Newsletter subscription for updates on new blog posts and research.
- Commenting system for blog posts to engage with readers.
- Chatbot (local LLMs sourced) integration for instant assistance.

### License
- This project is licensed under the MIT License - see the LICENSE file for details.


        



