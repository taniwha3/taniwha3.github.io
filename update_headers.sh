#\!/bin/bash

# Get today's date in YYYY-MM-DD format
TODAY=$(date +"%Y-%m-%d")

# Process each markdown file
for file in $(find . -name "*.md"); do
  # Skip the CLAUDE.md file
  if [[ "$file" == "./CLAUDE.md" ]]; then
    continue
  fi
  
  # Check if file already has a Last Updated header
  if grep -q "^> Last Updated:" "$file"; then
    # Update existing header
    sed -i '' "s/^> Last Updated:.*$/> Last Updated: $TODAY/" "$file"
  else
    # Add new header at the top of the file
    tempfile=$(mktemp)
    echo "> Last Updated: $TODAY" > "$tempfile"
    echo "" >> "$tempfile"
    cat "$file" >> "$tempfile"
    mv "$tempfile" "$file"
  fi
  
  echo "Updated $file"
done

echo "All markdown files have been updated with today's date: $TODAY"
