# Configuracion de IA

## Cursor

Se creo `.cursorrules` en la raiz para que Cursor conozca el contexto de NoteFlow:

- Stack: Expo SDK 54, React Native 0.81, TypeScript, Expo Router, Gluestack UI v5 alpha, UniWind, FlashList, Zustand, AsyncStorage, Zod y Reanimated.
- Arquitectura: rutas en `app/`, componentes en `components/`, store en `store/`, tipos en `types/`, tokens en `constants/`.
- Restricciones: no usar WebViews para UI nativa, no introducir Context API para estado global, no sustituir FlashList por FlatList, respetar persistencia local y modo claro/oscuro.
- Estilo: componentes funcionales, hooks, tipos explicitos y formularios validados con Zod.

## Claude

`CLAUDE.md` apunta a `AGENTS.md`. Se amplio `AGENTS.md` con las convenciones tecnicas del proyecto para que Claude lea una unica fuente de reglas persistentes.

## Gemini

Se creo `GEMINI.md` con el mismo contexto operativo. Gemini no tiene un formato unico universal como `.cursorrules`, pero los proyectos suelen aceptar un archivo de instrucciones de repositorio o un prompt de sistema persistente en la herramienta usada.

## Criterio aplicado

El objetivo es evitar que una IA genere codigo contradictorio, por ejemplo:

- Usar React Navigation manual cuando el proyecto ya usa Expo Router.
- Crear providers de estado global con Context API.
- Guardar fechas como strings sin rehidratarlas a `Date`.
- Crear formularios sin Zod.
- Usar listas largas con `ScrollView` o `FlatList`.

La configuracion fuerza a cualquier asistente a leer el stack, las carpetas y las restricciones antes de proponer cambios.
