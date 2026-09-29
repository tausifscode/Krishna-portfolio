# VLSI Designer Portfolio

A responsive, single-page portfolio for a VLSI designer, featuring a chip illustration that separates into layers as you scroll and tilts with pointer movement.

## Preview locally

From the repository root, run:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Publish

The site deploys to GitHub Pages automatically when changes are pushed to `main`. The deployment workflow is in `.github/workflows/pages.yml`.

## Customize

- Update the placeholder name, biography, project descriptions, and email in `index.html`.
- Adjust the site styling in `styles.css`.
- Adjust the chip's scroll and pointer interactions in `script.js`.
