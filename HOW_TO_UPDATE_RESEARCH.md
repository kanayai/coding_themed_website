# How to Update Research Projects and Publications

This guide explains how to update your research projects and publications on the website.

## Updating Publications

Publications data is managed in the `data/publications.csv` file. This file is a Comma Separated Values (CSV) format.

To update your publications:

1.  **Open `data/publications.csv`:** Use a text editor or a spreadsheet program to open this file.
2.  **Add/Edit Entries:**
    *   Each row represents a publication.
    *   The columns are `date`, `authors`, `year`, `title`, `journal`, and `link`.
    *   Ensure each field is properly quoted if it contains commas.
    *   Add new publications as new rows.
    *   Edit existing publication details as needed.
    *   **Important:** Maintain the exact column headers.
3.  **Save the file:** Save your changes to `data/publications.csv`.
4.  **Commit and Push:** Commit the updated `data/publications.csv` file to your Git repository and push the changes.

The website will automatically reflect the updated publications after deployment.

## Updating Research Projects

Research project details are currently embedded directly within the `src/pages/Research.tsx` file as comments or static text.

To update your research projects:

1.  **Open `src/pages/Research.tsx`:** Navigate to and open this file in your code editor.
2.  **Locate Research Project Section:** Find the section responsible for displaying "Research Projects".
3.  **Edit Content:** Modify the text or add new project descriptions directly within the component's JSX or within a dedicated `rCodeBlock` string if it's designed to mimic a code file.
4.  **Save the file:** Save your changes to `src/pages/Research.tsx`.
5.  **Commit and Push:** Commit the updated `src/pages/Research.tsx` file to your Git repository and push the changes.

Consider creating a more structured data source (like another CSV or JSON file) for research projects in the future if they become numerous.
