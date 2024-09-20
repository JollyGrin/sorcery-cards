
#!/bin/bash

# Check if the correct number of arguments are provided
if [ $# -ne 3 ]; then
  echo "Usage: $0 <input_folder> <output_folder> <quality>"
  exit 1
fi

input_folder=$1
output_folder=$2
quality=$3

# Validate that quality is a number between 0 and 100
if ! [[ "$quality" =~ ^[0-9]+$ ]] || [ "$quality" -lt 0 ] || [ "$quality" -gt 100 ]; then
  echo "Error: Quality must be an integer between 0 and 100."
  exit 1
fi

# Create the output folder if it doesn't exist
echo "Creating output folder: $output_folder"
mkdir -p "$output_folder"

# Count the total number of images to process
total_files=$(find "$input_folder" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | wc -l)
if [ "$total_files" -eq 0 ]; then
  echo "No images found in $input_folder."
  exit 1
fi

echo "Total images to process: $total_files"

# Initialize progress tracker
counter=0

# Process each image
find "$input_folder" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r input_file; do
  # Increment the counter and show progress
  counter=$((counter + 1))
  output_file="$output_folder/$(basename "$input_file" | sed 's/\.[^.]*$/.webp/')"
  
  echo "[$counter/$total_files] Processing: $input_file -> $output_file (Quality: $quality)"

  # Convert the image using ImageMagick with the specified quality
  magick "$input_file" -quality "$quality" "$output_file"

done

echo "Compression complete! Processed $total_files images."
