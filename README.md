# FUTURE_FS_01
PERSONAL PROFESSIONAL PORTFOLIO WEBSITE


# Jyotirmoy Mondal — Portfolio Website

My personal portfolio website, built for the Future Interns Full Stack Web
Development internship (Task 1). It showcases my background, skills,
projects, education, and a way to get in touch.

## About this project

A single-page, fully responsive portfolio built with plain HTML, CSS, and
JavaScript — no build tools required, so it deploys anywhere as static
files. The design uses a developer-terminal aesthetic (file-tree
navigation, command-style section headers) to reflect a CS/full-stack
identity.

### Sections
- **Home** — intro, role, and quick links
- **About** — background and what I'm focused on
- **Projects** — Crop Disease Detection (CNN/TensorFlow) and Schedulr
  (Next.js/Node/PostgreSQL timetable + attendance system)
- **Education** — degree, CGPA, coursework, certifications, extracurriculars
- **Skills** — languages, frameworks, databases, libraries, tools
- **Contact** — contact form (opens your email client with the message
  pre-filled) plus direct email/phone

## Tech stack

- HTML5, CSS3 (custom properties, no framework)
- Vanilla JavaScript (IntersectionObserver for active-section nav,
  theme toggle, mailto contact form)
- Google Fonts: JetBrains Mono + Inter

No backend or database is used in this version — the contact form uses a
`mailto:` link instead of a server. See "Next steps" below for how to add
a real backend.

## Project structure

```
portfolio/
├── index.html          # all page content/sections
├── style.css            # design tokens + styles
├── script.js             # nav, theme toggle, contact form behavior
├── Jyotirmoy_Mondal_Resume.pdf
└── README.md
```
