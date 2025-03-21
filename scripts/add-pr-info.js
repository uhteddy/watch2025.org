const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const [filePath, prNumber, prTitle, author, mergedAt] = process.argv.slice(2);

// Read the file
const content = fs.readFileSync(filePath, 'utf8');

// Split frontmatter and content
const parts = content.split(/---\s*[\r\n]+/);
if (parts.length < 3) {
  console.error('Invalid file format');
  process.exit(1);
}

// Parse the frontmatter
const frontmatter = yaml.load(parts[1]);

// Initialize pullRequests array if it doesn't exist
if (!frontmatter.pullRequests) {
  frontmatter.pullRequests = [];
}

// Add the new PR info
frontmatter.pullRequests.push({
  number: parseInt(prNumber),
  title: prTitle,
  url: `https://github.com/uhteddy/project2025-tracker/pull/${prNumber}`,
  author,
  mergedAt,
});

// Convert back to YAML
const newFrontmatter = yaml.dump(frontmatter);
const newContent = `---\n${newFrontmatter}---\n${parts[2]}`;

// Write back to the file
fs.writeFileSync(filePath, newContent, 'utf8');

console.log(`Updated PR info in ${filePath}`);