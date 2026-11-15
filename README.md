# Steven Santos: Portfolio (second layout)

A single-page CV site: hero, about, experience, testimonial, photo and video
cards, skills, projects, contact. Plain HTML/CSS/JS, no build step.

Live at https://stevensantos5610-hub.github.io/portfolio/

This is a second site with a different layout. The original site is separate
and stays up at https://stevensantos5610-hub.github.io/personal-website/

## Run it locally

```bash
python3 -m http.server 8421 --directory .
```

Then visit `http://localhost:8421`.

## Where things are

- `index.html`: the whole page
- `css/styles.css`: all styles; colors and fonts are the variables under `:root`
- `js/main.js`: mobile menu, header line on scroll, photo viewer
- `assets/`: images and videos

## Deploying

GitHub Pages serves the `main` branch root, so pushing to `main` publishes.
