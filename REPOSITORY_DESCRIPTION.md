# Repository Description: Kaycee074.github.io

## Overview

This is a **personal academic website** repository for **James Kelechi Onyejizu**, a Ph.D. candidate at Rensselaer Polytechnic Institute (RPI). The website is hosted on GitHub Pages at [https://Kaycee074.github.io](https://Kaycee074.github.io) and serves as a professional portfolio showcasing academic work, research, publications, teaching experience, and professional accomplishments.

## Purpose

The repository serves as:
- **Academic Portfolio**: Showcasing research work, publications, and academic achievements
- **Professional Profile**: Highlighting education, experience, and expertise in machine learning and control systems
- **Teaching Platform**: Documenting teaching experience and courses
- **Publication Repository**: Organizing and sharing academic papers and research
- **Contact Hub**: Providing professional contact information and social media links

## Technology Stack

### Core Technologies
- **Jekyll**: Static site generator (Ruby-based)
- **GitHub Pages**: Hosting platform
- **Minimal Mistakes Theme**: Jekyll theme by Michael Rose (forked and customized)
- **Markdown**: Content markup language
- **Liquid**: Template language
- **SCSS/Sass**: Styling
- **HTML/CSS/JavaScript**: Frontend technologies

### Dependencies
- **Ruby Gems**:
  - `github-pages`: GitHub Pages integration
  - `jekyll-feed`: RSS feed generation
  - `jekyll-sitemap`: Sitemap generation
  - `hawkins`: LiveReload support
  
- **Node.js packages**:
  - `uglify-js`: JavaScript minification
  - `onchange`: File watching for development
  - `npm-run-all`: Running multiple npm scripts

### Plugins
- jekyll-paginate
- jekyll-sitemap
- jekyll-gist
- jekyll-feed
- jekyll-redirect-from

## Repository Structure

### Root Directory Files
```
├── _config.yml          # Main Jekyll configuration
├── _config.dev.yml      # Development configuration
├── Gemfile              # Ruby dependencies
├── package.json         # Node.js dependencies
├── README.md            # Setup instructions
├── CHANGELOG.md         # Theme changelog
├── CONTRIBUTING.md      # Contribution guidelines
├── LICENSE              # MIT License
└── .gitignore           # Git ignore rules
```

### Content Directories

#### `_pages/`
Main website pages and navigation items:
- `about.md`: Homepage/About page with bio, education, and recent news
- `cv.md`: Curriculum Vitae
- `publications.md`: Publications listing page
- `teaching.html`: Teaching experience page
- `talks.html`: Talks and presentations page
- `portfolio.html`: Portfolio/projects page
- `404.md`: Custom error page
- `terms.md`: Terms and privacy policy

#### `_publications/`
Academic publications (template examples):
- `2009-10-01-paper-title-number-1.md`
- `2010-10-01-paper-title-number-2.md`
- `2015-10-01-paper-title-number-3.md`

Each publication includes:
- Title, date, venue
- Abstract/excerpt
- Citation information
- PDF link

#### `_teaching/`
Teaching experience entries:
- `2021-spring-teaching.md`
- `2022-spring-teaching.md`: ECSE 6660 Internetworking of Things (IoT)

Contains course descriptions, venues, dates, and locations.

#### `_talks/`
Conference talks and presentations:
- `2012-03-01-talk-1.md`
- `2014-02-01-talk-2.md`

#### `_portfolio/`
Project portfolio items:
- `portfolio-1.md`
- `portfolio-2.html`

#### `_drafts/`
Draft posts not yet published:
- `post-draft.md`

### Theme and Layout Directories

#### `_layouts/`
Jekyll layout templates for different page types

#### `_includes/`
Reusable HTML components and partials

#### `_sass/`
SCSS/Sass stylesheets for theming and styling

### Asset Directories

#### `images/`
Image assets including:
- `KC1.jpg`: Profile photo (avatar)
- `A23.jpg`: Research flyer
- Various other images for content
- Bio photos and theme images

#### `files/`
Downloadable files:
- `EBESS.pdf`: Academic document
- `RPI.pdf`: RPI-related document
- `paper1.pdf`, `paper2.pdf`, `paper3.pdf`: Sample papers

#### `assets/`
Additional web assets:
- JavaScript files
- CSS files
- Vendor libraries

### Utility Directories

#### `markdown_generator/`
Python scripts and Jupyter notebooks for generating markdown content from structured data:
- `publications.py`, `publications.ipynb`: Generate publication pages
- `talks.py`, `talks.ipynb`: Generate talk pages
- `pubsFromBib.py`, `PubsFromBib.ipynb`: Generate from BibTeX
- TSV files for data input

#### `talkmap/`
Map visualization for talks/presentations:
- `talkmap.py`: Python script for map generation
- `talkmap.ipynb`: Jupyter notebook interface

## Key Features and Content

### Personal Information
- **Name**: James Kelechi Onyejizu
- **Position**: Ph.D. Candidate at Rensselaer Polytechnic Institute
- **Department**: Electrical, Computer, and Systems Engineering
- **Email**: onyejj@rpi.edu
- **Location**: Troy, New York

### Research Focus
Machine learning scientist with research at the intersection of:
- Machine Learning
- Optimization
- Control Systems

### Key Projects (as listed on the site)
1. Automating Safe Reinforcement Learning (AIRC Research)
2. Safe and Robust Prompt Tuning of Foundation Models (AIRC Research)
3. Off-Policy Evaluation for Safe Offline Reinforcement Learning (IBM Research)
4. Probabilistic Low-Rank Adaptation (LoRA) for Large Language Models
5. Machine Learning for Bi-Linear Flow Models
6. Ensuring Safety in Multimodal Machine Learning Models

### Education
- **B.Sc**: Electrical & Electronics Engineering - First Class Honours, Valedictorian
- **M.Sc**: Computer & Systems Engineering - Distinction
- **Ph.D**: Electrical, Computer, & Systems Engineering (2021 - Present)

### Recent News (as of November 2025)
- November 2025: Presented work on Graph Based Learning for IAQ at ACM BALANCE and ACM BUILDSYS
- October 2025: Received 2025 Graduate Teaching Excellence Award at Rensselaer
- April 2025: Received Dr. Alireza Seyedi '99, '04 Award at Rensselaer
- October 2024: Passed Doctoral Candidacy Examination
- October 2024: Received ACM SIG Travel Grant Award

### Social Media Links
- GitHub: Dbrainiac074
- LinkedIn: /james-onyejizu-662205118/
- Instagram: techh_gk

## Development Setup

### Prerequisites
- Ruby (with ruby-dev)
- Bundler
- Node.js
- Git

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/Kaycee074/Kaycee074.github.io.git
   cd Kaycee074.github.io
   ```

2. Install Ruby dependencies:
   ```bash
   bundle install
   ```
   Note: If you encounter errors, delete `Gemfile.lock` and try again

3. Install Node.js dependencies (optional, for JS building):
   ```bash
   npm install
   ```

4. Run local server:
   ```bash
   bundle exec jekyll serve
   ```
   or with live reload:
   ```bash
   bundle exec jekyll liveserve
   ```

5. View site at: `http://localhost:4000`

### Building Assets
- Minify JavaScript: `npm run build:js`
- Watch for JS changes: `npm run watch:js`

## Configuration

### Site Configuration (`_config.yml`)
- **Locale**: en-US
- **Title**: "Onyejizu's Homepage"
- **Description**: "PhD Candidate at RPI"
- **URL**: https://Kaycee074.github.io
- **Repository**: Kaycee074/Kaycee074.github.io
- **Timezone**: America/Los_Angeles

### Collections
The site uses Jekyll collections for organizing content:
- `teaching`: Teaching experience
- `publications`: Academic publications
- `portfolio`: Projects and portfolio items
- `talks`: Presentations and talks

### Analytics
- Google Universal Analytics configured (tracking ID in config)

## Content Management

### Adding New Publications
1. Create a new markdown file in `_publications/`
2. Use the format: `YYYY-MM-DD-title.md`
3. Include frontmatter with title, date, venue, citation
4. Alternatively, use the markdown generator scripts in `markdown_generator/`

### Adding New Teaching Entries
1. Create a new markdown file in `_teaching/`
2. Include course details, venue, date, location

### Adding New Talks
1. Create a new markdown file in `_talks/`
2. Include talk title, venue, date, and description

### Adding New Portfolio Items
1. Create a new markdown or HTML file in `_portfolio/`
2. Include project description and relevant links

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the repository. GitHub Pages builds the Jekyll site and hosts it at the configured URL.

### GitHub Pages Settings
- Repository: Kaycee074/Kaycee074.github.io
- Branch: Typically `main` or `master`
- URL: https://Kaycee074.github.io

## Maintenance Notes

### Security
- If you receive a security vulnerability notification, delete `Gemfile.lock` as recommended in README
- Keep dependencies updated regularly

### Theme Updates
- This is a forked and detached template from academicpages
- Updates to the original theme can be manually patched
- See CHANGELOG.md for theme changes

## File Conventions

### Markdown Files
- Use YAML frontmatter for metadata
- Follow naming convention: `YYYY-MM-DD-title.md` for dated content
- Use lowercase with hyphens for filenames

### Images
- Store in `/images/` directory
- Reference with full URL: `https://Kaycee074.github.io/images/filename.jpg`

### PDFs and Files
- Store in `/files/` directory
- Access at: `https://Kaycee074.github.io/files/filename.pdf`

## License

This repository uses the MIT License. The theme is originally from Minimal Mistakes by Michael Rose, also under MIT License.

## Support and Resources

- **Original Theme**: [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/)
- **Template Source**: [Academic Pages](https://academicpages.github.io/)
- **Jekyll Documentation**: [jekyllrb.com](https://jekyllrb.com/)
- **GitHub Pages**: [pages.github.com](https://pages.github.com/)

## Summary

This repository represents a complete academic website solution built on Jekyll and GitHub Pages. It showcases James Onyejizu's academic journey, research contributions, teaching experience, and professional achievements in the field of machine learning and control systems. The site is well-structured, using modern web technologies and follows best practices for academic portfolio websites.
