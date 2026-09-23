# sprout-plant-care-landing
An interactive, lifestyle-inspired front-end project for Inovegen Internship Task 2. Features a custom color system, responsive layout, dark/light theme toggle, FAQ accordion, testimonial carousel, and form validation with modern JavaScript.


# Sprout — Plant Care Landing Page

**Inovegen Internship — Task 2: Interactive Website with JavaScript**
**Domain:** Web Development — Front-End
**Author:** Laiba Aftab

**Live demo:** _add your GitHub Pages link here after deploying_

## Concept

Sprout is a plant-care subscription service. The site introduces the service, explains how it works, and collects sign-ups from visitors who want a free "light check" for their home.

## Project structure

```
├── index.html      → page structure and content
├── styles.css       → all styling, responsive layout, theming
├── script.js         → all interactivity
└── README.md
```

## Features

- Responsive layout for desktop, tablet, and mobile (Flexbox + CSS Grid)
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<blockquote>`, `<ol>`

### JavaScript interactions
1. **Mobile navigation menu** — hamburger toggle for small screens
2. **Dark / light theme toggle** — persists across visits using `localStorage`
3. **FAQ accordion** — expand/collapse answers, only one open at a time
4. **Testimonial carousel** — previous/next controls plus clickable dots
5. **"Book a consult" modal** — opens from the hero, closes on click-outside, close button, or Escape key
6. **Sign-up form validation** — checks required fields and email format on blur and on submit, with inline error messages and a success confirmation

## How to run

No build step or dependencies required.

1. Download/clone the project folder.
2. Open `index.html` directly in any browser, **or** serve it locally:
   ```
   npx serve .
   ```

## How to deploy (GitHub Pages)

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**, set the source branch to `main` and root folder.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.

## Notes

- Colour palette and typography (Fraunces + Work Sans) were chosen to fit a plant-care brand rather than a generic template look.
- Respects `prefers-reduced-motion` and keeps visible keyboard focus states throughout.
- Screenshots of the desktop and mobile views should be added to this repo as required by the task deliverables (take these after opening the deployed page in a browser).
