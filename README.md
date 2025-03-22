# Watch2025.org

[![Validate Markdown Files](https://github.com/uhteddy/watch2025.org/actions/workflows/checkastro.yml/badge.svg)](https://github.com/uhteddy/watch2025.org/actions/workflows/checkastro.yml)

Watch2025.org is an open-source, community-maintained tracker for monitoring the implementation of Project 2025, a policy blueprint for reshaping American governance. This platform provides transparent, factual information on policy proposals, implementation status, and potential impacts.

## Purpose

This tracker aims to:

1. **Provide transparency** about Project 2025 policies and their implementation status
2. **Track progress** of various policy initiatives across government agencies
3. **Maintain factual, non-partisan information** about complex policy changes
4. **Enable community contributions** to keep information current and accurate

## How to Contribute

### Adding or Editing an Initiative

The tracker relies on community contributions to stay updated. Here's how you can help:

#### Option 1: Submit a Pull Request (for GitHub users)

1. Fork this repository to your GitHub account
2. Create a new markdown file in `src/content/initiatives/` or edit an existing one
3. Follow the [initiative markdown documentation](./documentation/initiative-markdown.md) for proper formatting
4. Submit a pull request with your changes
5. Our team will review and merge valid contributions

**Example of creating a new initiative file:**

```md
---
title: "Climate Research Defunding"
description: "Project 2025 proposes eliminating federal funding for climate change research."
status: "proposed"
category: "Environment"
dateProposed: 2025-01-15
# Additional metadata fields (see documentation)
---

## Overview
Initiative overview text here...

## Goals
- Goal 1
- Goal 2

## Implementation Progress
Current status details...

## Challenges & Controversies
Known issues and opposition...

## Next Steps
Upcoming phases of implementation...
```

#### Option 2: Submit an Issue (for non-technical contributors)

If you're not familiar with GitHub workflows:

1. Go to the [Issues tab](https://github.com/uhteddy/watch2025.org/issues)
2. Click "New Issue"
3. Select the appropriate template or create a blank issue
4. Provide detailed information about the initiative you'd like to add or edit
5. Our volunteers will create/update the file based on your information

### Initiative Documentation

For detailed information about the structure and required fields for initiative files, please refer to our [Initiative Markdown Documentation](./documentation/initiative-markdown.md).

## What Can Be Contributed

Everything in this repository is open for community contributions:

- **Initiative content**: Add new initiatives or update existing ones
- **Status updates**: Update implementation progress of tracked policies
- **Source links**: Add reliable sources and references 
- **Metadata enhancements**: Add tags, categories, or related initiatives
- **Timeline events**: Add significant events to initiative timelines
- **UI/UX improvements**: Help enhance the website interface
- **Documentation**: Improve our contributor guidelines or documentation

## Development

### Local Setup

```bash
# Clone the repository
git clone https://github.com/uhteddy/watch2025.org
cd watch2025.org

# Install dependencies
npm install

# Start development server
npm run dev
```

### Technologies Used

- [Astro](https://astro.build) - Web framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Svelte](https://svelte.dev) - Interactive components
- [Cloudflare](https://cloudflare.com) - Hosting and deployment

## License

This project is open source and available under the [MIT License](LICENSE).

## Code of Conduct

Please note that this project maintains a factual, non-partisan approach. All contributions should focus on accurate information without political commentary.