# Initiative Markdown Documentation

## Overview
This document explains how to create and format initiative files for the Project 2025 Tracker. Each initiative is represented by a markdown file in the `src/content/initiatives/` directory with frontmatter metadata and markdown content.

## File Structure
Each initiative file follows this structure:
```markdown
---
# Frontmatter metadata (YAML format)
title: "Initiative Title"
description: "Brief description of the initiative"
# Additional metadata fields...
---

# Markdown content (Body of the initiative)
```

## Frontmatter Fields

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | String | The title of the initiative |
| `description` | String | Short description (1-2 sentences) |
| `status` | Enum | Current status: `proposed`, `in-progress`, `passed`, or `blocked` |
| `category` | String | Policy category (e.g., "Immigration", "Healthcare") |
| `dateProposed` | Date | When the initiative was proposed (YYYY-MM-DD format) |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `datePassed` | Date | When the initiative was enacted (YYYY-MM-DD format) |
| `agency` | String | Implementing government agency |
| `impactAreas` | Array | List of areas affected by the initiative |
| `progressPercentage` | Number | Implementation progress (0-100) |
| `tags` | Array | Keywords related to the initiative |
| `priority` | Enum | Priority level: `low`, `medium`, `high`, or `critical` |
| `leadSponsors` | Array | Organizations/individuals sponsoring the initiative |

### Sources and References

```yaml
sources:
    - title: "Source Title"
        url: "https://example.com/source"
        description: "Optional description of the source"
```

### Implementation Timeline

```yaml
timeline:
    - date: 2025-02-01
        title: "Event Title"
        description: "Description of the timeline event"
        url: "https://example.com/related-article" # Optional
```

## Markdown Content Guidelines

The markdown content should include the following sections:

1. **Overview**: General introduction to the initiative
2. **Goals**: Bullet points of key objectives
3. **Implementation Progress**: Current status of implementation
4. **Challenges & Controversies**: Issues and opposition
5. **Next Steps**: Upcoming implementation phases

Use markdown formatting for emphasis:
- `**Bold text**` for important concepts
- Bullet points for lists
- Headers (`##`, `###`) for sections

## Example Initiative File

```markdown
---
title: "Climate Research Defunding"
description: "Project 2025 proposes eliminating federal funding for climate change research."
status: "proposed"
category: "Environment"
dateProposed: 2025-01-15
agency: "Environmental Protection Agency"
impactAreas:
    - "Scientific research"
    - "Environmental policy"
    - "Academic institutions"
progressPercentage: 10
tags:
    - "climate change"
    - "research funding"
    - "science policy"
priority: "high"
leadSponsors:
    - "The Heritage Foundation"
    - "Project 2025 Coalition"
timeline:
    - date: 2025-01-15
        title: "Policy Proposal"
        description: "Initial policy outlined in Project 2025 documentation."
    - date: 2025-02-10
        title: "Budget Proposal"
        description: "Formal budget proposal including research funding cuts."
        url: "https://example.gov/budget-proposal-2025"
sources:
    - title: "Project 2025 Environmental Policy Agenda"
        url: "https://www.project2025.org/environment-policy/"
        description: "Official documentation on environmental initiatives."
    - title: "Analysis of Proposed Climate Research Cuts"
        url: "https://example.org/climate-research-analysis"
        description: "Independent analysis of potential impacts."
---

## Overview
Project 2025 includes a **significant proposal to eliminate federal funding** for climate change research across multiple agencies, including the EPA, NASA, and NOAA. This initiative represents a major shift in science policy priorities.

## Goals
- **Redirect federal research funding** away from climate science toward other priorities.
- **Eliminate climate change considerations** from federal agency decision-making processes.
- **Reduce regulatory burdens** on industries affected by climate-related regulations.

## Implementation Progress
The proposal remains in early planning stages, with only **preliminary budget documents** outlining the intended funding cuts. No formal executive orders or legislation have been introduced.

## Challenges & Controversies
- **Scientific community opposition** from major research institutions and universities.
- **Legal challenges** from environmental organizations.
- **Concerns about data continuity** for long-term climate monitoring programs.

## Next Steps
- Develop detailed budget proposals specifying research program eliminations.
- Prepare executive orders to modify agency research priorities.
- Identify alternative funding mechanisms for critical monitoring infrastructure.
```

## Implementation Notes

1. Create your file in the `src/content/initiatives/` directory
2. Use kebab-case for filenames (e.g., `climate-research-defunding.md`)
3. Ensure all required fields are completed before submitting
4. Use descriptive, neutral language that focuses on factual information

The system uses the Astro content collections API to validate your frontmatter against the schema defined in `src/content/config.ts`.