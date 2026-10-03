# Hussnain Ansari Portfolio — Deployment & Admin Notes

## GitHub Pages white-screen fix

The portfolio repository is deployed at:

`https://hussnainansari-dev.github.io/portfolio/`

Vite is configured with:

```ts
base: '/portfolio/'
```

This matches the repository Pages path and prevents production assets from being requested from the domain root.

## Build locally

```bash
npm ci
npm run lint
npm run build
npm run preview
```

## Private Admin Studio

The public footer no longer exposes the Admin control. Open the studio directly on your own device with:

`https://hussnainansari-dev.github.io/portfolio/#/admin`

The studio contains:

- Profile Photo: crop an image, preview it locally, and download `profile.jpg` for `public/images/profile.jpg`.
- Journey Studio: create/edit local Learning-in-Public entries, preview them, and export the local entries as JSON.
- Resume PDF
- QR Generator
- SEO metadata inspector

### Important security model

GitHub Pages is static hosting. The Admin Studio is intentionally **local-only**: it does not send files to a server, and it does not contain a fake client-side password. Anything saved in localStorage is visible only to that browser/device.

To publish a profile photo for everyone, replace:

`public/images/profile.jpg`

with the downloaded file and commit/push to `main`.

To publish a Journey entry for everyone, transfer the exported JSON/content into the repository data layer (`src/data/learningJourney.ts`), then commit/push to `main`.

Local Journey entries are merged into the public Learning-in-Public UI on the same browser, so you can preview exactly how your new entry will look before publishing it.

## GitHub Actions

The existing workflow in `.github/workflows/deploy.yml` builds `dist` and deploys it through GitHub Pages. No workflow redesign is required for this fix.
