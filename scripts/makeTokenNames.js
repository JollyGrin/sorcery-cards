/**
 * Generate the name of tokens to a file that can be fetched
 *
 * Tokens are custom made to enable using them in spells.bar. To get the correct identifiers, call from public/tokens.json
 *
 * To add more tokens, just add the tokens to public/tokens as a .png
 * */

const fs = require("fs");
const path = require("path");

// Path to your folder
const folderPath = path.join(__dirname, "../public/tokens");

// Read all filenames in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading the directory", err);
    return;
  }

  // Filter to include only .png files
  const pngFiles = files
    .filter((file) => path.extname(file) === ".png")
    .map((file) => file.split(".")[0]);

  // Convert to JSON array of strings
  const jsonArray = JSON.stringify(pngFiles, null, 2);

  // Output the JSON to a file
  fs.writeFile("../public/tokens.json", jsonArray, (err) => {
    if (err) {
      console.error("Error writing the file", err);
    } else {
      console.log("tokens.json has been saved!");
    }
  });
});
