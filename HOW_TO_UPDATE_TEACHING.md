# How to Update Teaching Course Details

This guide explains how to update your teaching course details on the website.

Teaching course details are currently embedded directly within the `src/pages/Teaching.tsx` file. The content is formatted to mimic a LaTeX document (`teaching.tex`).

To update your teaching details:

1.  **Open `src/pages/Teaching.tsx`:** Navigate to and open this file in your code editor.
2.  **Locate LaTeX Code Block:** Find the `latexCode` string variable within the component. This string contains the LaTeX-formatted course information.
3.  **Edit Content:**
    *   Modify existing course details under `\section*{Current Courses}` and `\section*{Past Courses}`.
    *   Add new courses by following the LaTeX structure (e.g., `\subsection*{Course Title}`, descriptive text, `\begin{itemize}` for topics).
    *   Ensure the LaTeX syntax remains valid within the string.
4.  **Save the file:** Save your changes to `src/pages/Teaching.tsx`.
5.  **Commit and Push:** Commit the updated `src/pages/Teaching.tsx` file to your Git repository and push the changes.

The website will automatically reflect the updated teaching details after deployment. If you plan to have many courses, consider externalizing this data into a structured format (e.g., JSON or CSV) for easier management in the future.
