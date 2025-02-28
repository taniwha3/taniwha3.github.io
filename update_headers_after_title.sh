#\!/bin/bash

# Get today's date in YYYY-MM-DD format
TODAY=$(date +"%Y-%m-%d")

# Process each markdown file
for file in $(find . -name "*.md"); do
  # Skip the CLAUDE.md file
  if [[ "$file" == "./CLAUDE.md" ]]; then
    continue
  fi
  
  # Create a temporary file
  tempfile=$(mktemp)
  
  # First, remove any existing "Last Updated" line
  grep -v "^> Last Updated:" "$file" > "$tempfile"
  
  # Now find the first header and insert the date after it
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
    
    # Clean up temporary files
    rm "${tempfile}.part1" "${tempfile}.part2"
  else
    # If no header found, just put the date at the top
    echo "> Last Updated: $TODAY" > "$file"
    echo "" >> "$file"
    cat "$tempfile" >> "$file"
  fi
  
  rm "$tempfile"
  echo "Updated $file"
done

echo "All markdown files have been updated with today's date: $TODAY"
