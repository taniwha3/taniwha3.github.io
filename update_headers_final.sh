#\!/bin/bash

# Get today's date in YYYY-MM-DD format
TODAY=$(date +"%Y-%m-%d")

# Process each markdown file
for file in $(find . -name "*.md"); do
  # Skip the CLAUDE.md file
  if [[ "$file" == "./CLAUDE.md" ]]; then
    continue
  fi
  
  # First, remove any existing "Last Updated" line
  tempfile=$(mktemp)
  grep -v "^> Last Updated:" "$file" > "$tempfile"
  
  # Check if file has an H1 header (#)
  if grep -q "^# " "$tempfile"; then
    # Get line number of the first header
    header_line=$(grep -n "^# " "$tempfile" | head -1 | cut -d':' -f1)
    
    # Split the file at the header line
    head -n "$header_line" "$tempfile" > "${tempfile}.part1"
    tail -n +$((header_line + 1)) "$tempfile" > "${tempfile}.part2"
    
    # Create the new file with date after header
    cat "${tempfile}.part1" > "$file"
    echo "" >> "$file"
    echo "> Last Updated: $TODAY" >> "$file"
    echo "" >> "$file"
    cat "${tempfile}.part2" >> "$file"
    
    # Clean up temporary part files
    rm "${tempfile}.part1" "${tempfile}.part2"
  else
    # Special case for files without an H1 header
    # Check if it's the GCP file which has a title without # 
    if [[ "$file" == *"gcp_object_storage_security.md" ]]; then
      # Get the first line (title)
      first_line=$(head -n 1 "$tempfile")
      echo "$first_line" > "$file" # Add the title
      echo "" >> "$file"  # Add blank line
      echo "> Last Updated: $TODAY" >> "$file" # Add date
      echo "" >> "$file"  # Add blank line
      # Add the rest of the file, skipping the first line
      tail -n +2 "$tempfile" >> "$file"
    else
      # For other files without # headers, just add date at top
      echo "> Last Updated: $TODAY" > "$file"
      echo "" >> "$file"
      cat "$tempfile" >> "$file"
    fi
  fi
  
  rm "$tempfile"
  echo "Updated $file"
done

echo "All markdown files have been updated with today's date: $TODAY"
