const fs = require('fs');
const content = fs.readFileSync('src/data/products.json', 'utf8');

// The user appended a completely new JSON array
// Let's find the last occurrence of '[' that is followed by '{"id":101'
const searchPattern = '{"id":101';
const lastIndex = content.lastIndexOf(searchPattern);

if (lastIndex !== -1) {
  const arrayStart = content.lastIndexOf('[', lastIndex);
  if (arrayStart !== -1) {
    let newContent = content.substring(arrayStart);
    // Trim any trailing whitespace
    newContent = newContent.trim();
    // Validate it's a valid JSON
    try {
      JSON.parse(newContent);
      fs.writeFileSync('src/data/products.json', newContent);
      console.log("Successfully extracted and rebuilt products.json from the user's appended array.");
    } catch (e) {
      console.log("Extracted content is not valid JSON:", e.message);
    }
  } else {
    console.log("Could not find the opening bracket of the appended array.");
  }
} else {
  console.log("Could not find the start of the appended array.");
}
