# Mi rutina

App instalable (PWA) con mi rutina semanal: lista diaria con tareas completables, avance de la semana y avisos en el celular.

- `index.html`: la app (Hoy, Semana, Más). Lo tildado se guarda en el celular.
- `schedule.json`: **la rutina**. Para cambiar horarios o tareas se edita solo este archivo.
- `estudio.html`: catálogo de opciones de estudio (gratis primero), con pros y contras.
- `netlify/functions/subscribe.mjs`: guarda la suscripción de avisos del celular (Netlify Blobs).
- `netlify/functions/notify.mjs`: función programada cada 5 minutos; avisa a la hora de inicio de cada tarea (hora Argentina) leyendo `schedule.json`.
- Variable de entorno necesaria en Netlify: `VAPID_PRIVATE_JWK` (clave privada de los avisos).

## Publicar
Conectar este repo a Netlify (Import from Git). Cada push a `main` se publica solo.
Los avisos solo funcionan en Netlify (usa funciones); en GitHub Pages la app anda pero sin avisos.
Si cambiás archivos de la app, subí el número de `rutina-v2` en `sw.js` para que los celulares tomen la versión nueva.
