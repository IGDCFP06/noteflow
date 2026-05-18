# Gemini Project Context

You are assisting on NoteFlow, an Expo SDK 54 React Native app.

Use this stack and architecture:

- TypeScript with strict mode.
- Expo Router for tabs, stacks and modal routes.
- Gluestack UI v5 alpha concepts with UniWind/manual setup.
- FlashList for performant tab lists.
- Zustand store in `store/notesStore.ts`.
- AsyncStorage persistence through Zustand `persist`.
- Zod validation in forms.
- Reanimated entering/exiting animations for list cards.
- Expo Haptics for delete/archive and checklist completion feedback.

Folder conventions:

- `app/`: routes only.
- `components/`: reusable UI and screens.
- `constants/theme.ts`: colors, spacing, radius and typography.
- `types/index.ts`: domain interfaces and type guards.
- `docs/`: project documentation.

Rules:

- Do not use React Navigation manually.
- Do not use Context API for notes state.
- Do not replace FlashList in tab lists.
- Do not store persisted dates as plain strings in runtime state.
- Validate user input with Zod before store writes.
- Keep screens responsive and theme-aware.
