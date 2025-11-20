# General Website Maintenance and Updates

This guide provides general instructions for maintaining and updating your academic website.

## 1. Local Development Setup

To run the website locally for development or testing:

1.  **Install Node.js:** If you don't have it, download and install Node.js (which includes npm) from [nodejs.org](https://nodejs.org/).
2.  **Install Dependencies:** Navigate to the project's root directory in your terminal and install all required packages:
    ```bash
    npm install
    ```
3.  **Start Development Server:** Run the development server:
    ```bash
    npm run dev
    ```
    This will usually open the website in your browser at `http://localhost:5173/` (or a similar address).

## 2. Making General Content Updates

For content that is not part of blog posts, research, or teaching (which have their own specific guides), you will typically find it directly within the React components in the `src/pages/` or `src/components/` directories.

*   **Locate the relevant file:** Use your code editor to navigate to the `src` folder and find the component you wish to modify (e.g., `src/pages/Home.tsx` for the Home page's content).
*   **Edit the content:** Modify the text or structure directly within the JSX or within string variables (like `pythonCode`, `yamlCode`, `latexCode`) that define the thematic content blocks.
*   **Save your changes.** The local development server (if running) will hot-reload, showing your updates instantly.

## 3. Theming (Light/Dark Mode)

The website supports light and dark modes. The primary styling is managed through SCSS files (`.scss`) and CSS variables.

*   **Global Styles:** `src/index.scss` defines global CSS variables for theme colors and overall body styles.
*   **Component-Specific Styles:** Each component typically has its own `.scss` file (e.g., `src/components/ActivityBar.scss`, `src/styles/pages.scss`).
*   **Modifying Colors:** To change theme colors, adjust the `--variable-name-dark` and `--variable-name-light` values in `src/index.scss`. For example:
    ```scss
    :root {
      --background-color-dark: #282c34; // Dark mode background
      --background-color-light: #ffffff; // Light mode background
    }
    ```
*   **Adding New Themed Elements:** When adding new components or styling elements, ensure you use the CSS variables to make them theme-aware.

## 4. Deploying Changes

The website is configured for automatic deployment via Netlify upon pushing changes to the `main` branch of your GitHub repository.

1.  **Commit Your Changes:** After making and testing your local changes, commit them to your Git repository:
    ```bash
    git add .
    git commit -m "feat: Describe your changes here"
    ```
2.  **Push to GitHub:** Push your committed changes to the `main` branch on GitHub:
    ```bash
    git push origin main
    ```
    Netlify will detect the new push to `main` and automatically trigger a build and deploy your updated website.

## 5. Cleaning Up

To remove build artifacts and node modules:

*   **Clean Build:**
    ```bash
    npm run build # if you want to rebuild
    rm -rf dist # remove build output
    ```
*   **Clean Node Modules:**
    ```bash
    rm -rf node_modules
    npm cache clean --force
    ```

**Important Notes:**

*   Always test your changes locally before pushing to `main`.
*   Keep your `dependencies` up-to-date by regularly running `npm update`.
*   Refer to the specific `HOW_TO_...` guides for detailed instructions on managing blog posts, research, and teaching content.
