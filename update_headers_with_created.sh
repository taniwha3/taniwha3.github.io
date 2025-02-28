#!/bin/bash

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
  
  # First, check if "Created on" already exists in the file
  if grep -q "Created on:" "$file"; then
    echo "Skipping $file - already has Created on tag"
    continue
  fi
  
  # Now find "Last Updated" line if it exists
  if grep -q "^> Last Updated:" "$file"; then
    # Replace "Last Updated" with "Created on + Last Updated"
    sed "s/^> Last Updated: \(.*\)/> Created on: $TODAY | Last Updated: \1/" "$file" > "$tempfile"
    mv "$tempfile" "$file"
  else
    # If no Last Updated found, but there's a header, add both Created on and Last Updated after it
    if grep -q "^# " "$file"; then
      # Get line number of the first header
      header_line=$(grep -n "^# " "$file" | head -1 | cut -d':' -f1)
      
      # Split the file at the header line
      head -n "$header_line" "$file" > "${tempfile}.part1"
      tail -n +$((header_line + 1)) "$file" > "${tempfile}.part2"
      
      # Create the new file with created/updated dates after header
      cat "${tempfile}.part1" > "$file"
      echo "" >> "$file"
      echo "> Created on: $TODAY | Last Updated: $TODAY" >> "$file"
      echo "" >> "$file"
      cat "${tempfile}.part2" >> "$file"
      
      # Clean up temporary files
      rm "${tempfile}.part1" "${tempfile}.part2"
    else
      # If no header found, just put the dates at the top
      echo "> Created on: $TODAY | Last Updated: $TODAY" > "$tempfile"
      echo "" >> "$tempfile"
      cat "$file" >> "$tempfile"
      mv "$tempfile" "$file"
    fi
  fi
  
  echo "Updated $file with Created on tag"
done

echo "All markdown files have been updated with the Created on tag"