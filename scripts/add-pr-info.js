import fs from 'fs';
import { load, dump } from 'js-yaml';

// Get command line arguments - now just taking the file path
const filePath = process.argv[2];
// Reading PR data from environment variables instead
const prNumber = process.env.PR_NUMBER;
const prTitle = process.env.PR_TITLE;
const author = process.env.PR_AUTHOR;
const mergedAt = process.env.PR_MERGED_AT;

// Read the file
const content = fs.readFileSync(filePath, 'utf8');

// Split frontmatter and content
const parts = content.split(/---\s*[\r\n]+/);
if (parts.length < 3) {
  console.error('Invalid file format');
  process.exit(1);
}

// Parse the frontmatter
const frontmatter = load(parts[1]);

// Initialize pullRequests array if it doesn't exist
if (!frontmatter.pullRequests) {
  frontmatter.pullRequests = [];
}

// Add the new PR info
frontmatter.pullRequests.push({
  number: parseInt(prNumber),
  title: prTitle,
  url: `https://github.com/uhteddy/watch2025.org/pull/${prNumber}`,
  author,
  mergedAt,
});

// Convert back to YAML
const newFrontmatter = dump(frontmatter);
const newContent = `---\n${newFrontmatter}---\n${parts[2]}`;

// Write back to the file
fs.writeFileSync(filePath, newContent, 'utf8');

console.log(`Updated PR info in ${filePath}`);