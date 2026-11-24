# Plan de estudio

App instalable (PWA) con el catálogo de opciones de estudio, la semana y "Mi plan" con tildes de completado.

- `index.html`: toda la app en un solo archivo (datos, estilos y lógica).
- `manifest.webmanifest`, `sw.js`, `icon-*.png`: instalación y modo sin internet.

## Publicar
Conectá este repo a Netlify (Add new site > Import from Git). Cada push a `main` se publica solo, sin subir ZIP.
Si cambiás `index.html`, subí el número de `plan-estudio-v1` en `sw.js` para que los celulares tomen la versión nueva.
