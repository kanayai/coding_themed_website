#!/bin/bash

# Stop the script if any command fails
set -e

# --- CONFIGURATION ---
SOURCE_DIR="_quarto_source"
POSTS_DIR="posts"
PUBLIC_DIR="public"

# 1. --- VALIDATE INPUT ---
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 path/to/your-post.qmd"
    exit 1
fi

QMD_FILE=$1

if [ ! -f "$QMD_FILE" ]; then
    echo "Error: File not found at '$QMD_FILE'"
    exit 1
fi

echo "Publishing post from '$QMD_FILE'..."

# 2. --- RENDER THE QUARTO FILE ---
echo "Rendering with Quarto..."
quarto render "$QMD_FILE" --to html

# 3. --- DEFINE FILE NAMES & PATHS ---
# Get the base name of the file without the extension (e.g., "my-post")
BASENAME=$(basename "$QMD_FILE" .qmd)
# The path where Quarto generated the files
GENERATED_HTML_PATH="${SOURCE_DIR}/${BASENAME}.html"
GENERATED_ASSETS_PATH="${SOURCE_DIR}/${BASENAME}_files"
# The final destination for the files
DEST_HTML_PATH="${POSTS_DIR}/${BASENAME}.html"
DEST_ASSETS_PATH="${PUBLIC_DIR}/${BASENAME}_files"

# 4. --- MOVE THE HTML FILE ---
echo "Moving HTML file to '$DEST_HTML_PATH'..."
mv "$GENERATED_HTML_PATH" "$DEST_HTML_PATH"

# 5. --- HANDLE ASSETS ---
if [ -d "$GENERATED_ASSETS_PATH" ]; then
    echo "Assets folder found. Moving to '$DEST_ASSETS_PATH'..."
    # If the destination directory already exists, remove it before moving
    if [ -d "$DEST_ASSETS_PATH" ]; then
        rm -rf "$DEST_ASSETS_PATH"
    fi
    mv "$GENERATED_ASSETS_PATH" "$DEST_ASSETS_PATH"

    echo "Fixing asset paths in HTML file..."
    # Use sed to replace relative paths with absolute paths
    # This command works on both macOS and Linux
    sed -i.bak "s|src=\" ${BASENAME}_files/|src=\"/${BASENAME}_files/|g" "$DEST_HTML_PATH"
    # Remove the backup file created by sed
    rm "${DEST_HTML_PATH}.bak"
else
    echo "No assets folder found. Skipping asset handling."
fi

echo ""
echo "✅ Post published successfully!"
echo "HTML is at: ${DEST_HTML_PATH}"
if [ -d "$DEST_ASSETS_PATH" ]; then
    echo "Assets are at: ${DEST_ASSETS_PATH}"
fi
echo "Don't forget to commit the new files!"
