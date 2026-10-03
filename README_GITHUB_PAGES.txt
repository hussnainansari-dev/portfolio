HUSSAIN ANSARI PORTFOLIO — GITHUB PAGES

IMPORTANT: upload the CONTENTS of this folder to the ROOT of your GitHub repository.
Do NOT upload the outer folder itself.

The repository root must directly contain:
  package.json
  package-lock.json
  vite.config.ts
  index.html
  src/
  public/
  .github/

GitHub Pages:
1. Repository -> Settings -> Pages
2. Under Build and deployment, set Source to GitHub Actions.
3. Push/commit the files to the main branch.
4. Repository -> Actions -> Deploy to GitHub Pages.
5. Wait for the workflow to finish successfully.
6. Open: https://hussnainansari-dev.github.io/portfolio/

If the page was previously cached, use Ctrl+Shift+R after deployment.

Admin Studio:
https://hussnainansari-dev.github.io/portfolio/#/admin

The admin studio's photo and journey drafts are local browser previews. They do not
silently publish to GitHub. To publish a profile photo, download profile.jpg and
replace public/images/profile.jpg, then commit. Journey entries can be exported as
JSON and then added intentionally to the repository data.
