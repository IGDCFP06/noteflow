# NoteFlow Agent Instructions

Read the exact versioned Expo docs at https://docs.expo.dev/versions/v54.0.0/ before changing native or Expo-specific code.

This repository is NoteFlow: an Expo SDK 54 productivity app using React Native, TypeScript, Expo Router, Gluestack UI v5 alpha concepts with UniWind, FlashList, Zustand, AsyncStorage, Zod, Reanimated and Expo Haptics.

Conventions:

- Routes live in `app/` and must use Expo Router file-based navigation.
- Global note state lives in `store/notesStore.ts` with Zustand.
- Persisted data uses AsyncStorage through Zustand middleware.
- Domain interfaces and type guards live in `types/index.ts`.
- Theme tokens live in `constants/theme.ts`; all UI must support light and dark mode.
- Lists in tabs use FlashList, not FlatList or ScrollView.
- Creation forms must validate with Zod.
- Icons should come from `@expo/vector-icons`.
- Keep components native React Native components, not HTML or WebView.

Do not introduce a second navigation system, a second global state library, or a competing design-token source without updating the architecture docs.
