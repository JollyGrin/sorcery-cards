#!/bin/bash

# Check if the correct number of arguments are provided
if [ $# -ne 2 ]; then
  echo "Usage: $0 <input_folder> <output_folder>"
  exit 1
fi

input_folder=$1
output_folder=$2

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
  
  echo "[$counter/$total_files] Processing: $input_file -> $output_file"

  # Convert the image using ImageMagick
  magick "$input_file" -quality 90 "$output_file"

done

echo "Compression complete! Processed $total_files images."
