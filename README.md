# NoteFlow

NoteFlow es una app movil Expo para capturar notas, checklists e ideas etiquetadas con persistencia local.

## Stack

- Expo SDK 54 + React Native 0.81
- TypeScript
- Expo Router
- Gluestack UI v5 alpha + UniWind/manual provider
- Shopify FlashList
- Zustand + AsyncStorage
- Zod
- Reanimated
- Expo Haptics

## Ejecutar

```bash
npm install
npm run typecheck
npm start
```

## Rutas principales

- `/notas`: notas de texto.
- `/checklists`: listas de tareas.
- `/ideas`: ideas con etiquetas y color.
- `/archivo`: contenido archivado.
- `/nueva-nota`: modal de creacion.

## Gestion del trabajo

Tablero Trello: pendiente de crear en Trello porque este entorno no tiene conector ni credenciales de Trello. La estructura y tarjetas estan preparadas en [docs/project-management.md](./docs/project-management.md).

## Documentacion

- [Idea](./docs/idea.md)
- [Teoria React Native](./docs/react-native-teoria.md)
- [Gestion del proyecto](./docs/project-management.md)
- [Configuracion IA](./docs/ai-setup.md)

## Verificacion actual

`npm run typecheck` pasa correctamente.
