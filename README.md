# V&V Automation website

A premium, responsive product website for V&V Automation—an Indian CNC machine manufacturer based in Delhi.

## Local development

```sh
npm install
npm run dev
```

## Production checks

```sh
npm run build
npm run test
```

## Project structure

- `src/pages/` contains the five public routes.
- `src/components/` contains shared layout and section primitives.
- `src/data/catalog.ts` is the single source of truth for machines, parts, contact details and company highlights.
- `src/assets/` contains product and facility photography.
- `public/og.png` is the social sharing image.

The contact form prepares an enquiry in WhatsApp; it does not store or transmit form data through a separate form service.
