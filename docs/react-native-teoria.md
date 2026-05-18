# React Native, Expo y arquitectura de NoteFlow

## React Native frente a una app nativa

React Native permite escribir la interfaz con React y JavaScript/TypeScript, pero los componentes como `View`, `Text` o `TextInput` se respaldan con vistas nativas de Android e iOS. No es una web embebida en un `WebView`: React Native traduce el arbol de componentes a controles del sistema operativo, por eso la app se siente nativa.

Una app nativa pura se escribe directamente con Swift/SwiftUI en iOS o Kotlin/Jetpack Compose en Android. Tiene acceso inmediato a todas las APIs de la plataforma, pero duplica mucho trabajo si quieres mantener dos apps. React Native centraliza gran parte de la logica y UI, y permite bajar a codigo nativo cuando hace falta.

Fuente: documentacion oficial de React Native sobre componentes nativos: https://reactnative.dev/docs/intro-react-native-components

## Metro bundler

Metro es el bundler que React Native usa para transformar JavaScript/TypeScript y assets en el bundle que consume la app. En Expo, Metro tambien se integra con `expo start`, cache de desarrollo, web con Metro y configuraciones como UniWind.

En NoteFlow se creo `metro.config.js` para extender la configuracion por defecto de Expo y activar `withUniwindConfig`.

Fuente: https://reactnative.dev/docs/metro

## Expo Go y Development Build

Expo Go es ideal para aprender y probar rapido, pero contiene un conjunto fijo de modulos nativos. Si una app necesita librerias nativas no incluidas, cambios reales de icono/splash, notificaciones push remotas o enlaces universales, necesita un Development Build.

Un Development Build es un binario propio con `expo-dev-client`, mas parecido al entorno real de una app de produccion. Para NoteFlow, Expo Go es suficiente para esta fase porque las librerias instaladas son compatibles con Expo SDK, pero en un proyecto profesional se prepararia EAS Development Build desde el inicio.

Fuente: https://docs.expo.dev/develop/development-builds/introduction/

## Sistemas de diseno

### Gluestack UI

Gluestack UI v5 alpha propone componentes universales para Expo/React Native y una filosofia cercana a Tailwind CSS. Permite usar UniWind en Expo, con tokens en `global.css`, sin paso PostCSS. Encaja bien cuando la identidad visual no quiere parecer Material Design por defecto.

En este entorno la CLI `npx gluestack-ui@alpha init --uniwind` quedo bloqueada clonando su plantilla. Para mantener el proyecto funcional, se aplico la configuracion manual documentada por Gluestack: dependencias `uniwind`, `@gluestack-ui/core`, `@gluestack-ui/utils`, `tailwindcss`, `global.css`, `metro.config.js` y un `GluestackUIProvider` local que expone los tokens de NoteFlow.

Fuentes: https://v5.gluestack.io/ui/docs/home/getting-started/installation y https://v5.gluestack.io/ui/docs/guides/more/upgrade-to-v5

### React Native Paper

React Native Paper implementa Material Design, trae `PaperProvider`, temas MD3 y muchos componentes listos. Es excelente para apps Android con convenciones Material, pero limita mas la personalidad visual inicial si no se personaliza de forma profunda.

Fuente: https://callstack.github.io/react-native-paper/docs/guides/getting-started/

### Eleccion

NoteFlow usa Gluestack UI + UniWind porque el producto necesita tarjetas diferenciadas, colores de ideas, tokens propios y una identidad menos Material. Paper queda como alternativa si se priorizara velocidad con componentes prehechos.

## Navegacion

Expo Router usa archivos para declarar rutas. En NoteFlow:

- Tabs: `app/(tabs)/_layout.tsx` define la navegacion principal entre Notas, Tareas, Ideas y Archivo.
- Stack: cada tab tiene su propio `_layout.tsx` para permitir `index` y `[id]` con historial interno.
- Modal: `app/nueva-nota.tsx` se presenta como modal para crear contenido sin perder el contexto de la tab activa.

Tabs sirven para secciones hermanas persistentes. Stack sirve para profundizar en detalle y volver. Modal sirve para una tarea temporal de creacion.

Fuente: https://docs.expo.dev/router/installation/

## Modelado de datos con TypeScript

Los tipos principales estan en `types/index.ts`:

```ts
interface BaseNote {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Note extends BaseNote { content: string; }
interface ChecklistNote extends BaseNote { items: ChecklistItem[]; }
interface IdeaNote extends BaseNote { tags: string[]; color: string; }
type AnyNote = Note | ChecklistNote | IdeaNote;
```

La union `AnyNote` permite escribir funciones que aceptan cualquier contenido. Para distinguirlos en runtime se usan type guards:

```ts
function isChecklistNote(note: AnyNote): note is ChecklistNote {
  return 'items' in note;
}
```

Si `'items' in note` es verdadero, TypeScript estrecha el tipo a `ChecklistNote`.

## Gestion de estado

`useState` es perfecto para estado local de una pantalla, como el texto actual de busqueda o los campos de un formulario.

Context API sirve para datos globales simples, pero si se usa para estado que cambia a menudo puede provocar renders amplios y obliga a envolver providers.

Zustand mantiene un store global sin providers anidados y permite seleccionar solo el fragmento que necesita cada componente. En NoteFlow se usa para notas, checklists, ideas, archivado, eliminacion, toggle de items y rehidratacion.

La persistencia usa `persist` y `createJSONStorage` de Zustand con AsyncStorage.

Fuente: https://zustand.docs.pmnd.rs/reference/integrations/persisting-store-data

## Persistencia local y rehidratacion

AsyncStorage guarda valores como strings. Para objetos, se serializa a JSON. NoteFlow delega esto a `createJSONStorage`, que usa JSON internamente, y añade un `reviver` para convertir `createdAt` y `updatedAt` de nuevo a `Date`.

Durante la rehidratacion el store carga el JSON guardado en `noteflow-storage`. Mientras `hasHydrated` es falso, `app/_layout.tsx` muestra un indicador de carga. Al terminar, se renderiza la navegacion.

Limitaciones: no hay cifrado, los datos viven solo en el dispositivo y no conviene guardar grandes volumenes de contenido.

Fuente: https://react-native-async-storage.github.io/async-storage/docs/usage/

## Rendimiento en listas

FlashList mejora el rendimiento de listas largas reciclando celdas. Cuando un item sale del viewport, el componente puede reutilizarse con otro `item` en lugar de destruirse y recrearse. Esto reduce trabajo en el hilo JS y evita espacios en blanco al hacer scroll rapido.

En NoteFlow todas las tabs usan FlashList. La version compatible con Expo SDK 54 instala FlashList 2.x, que reduce la necesidad de estimaciones manuales; aun asi el wrapper `EstimatedFlashList` conserva `estimatedItemSize` como documentacion de la idea de dimensionado previo y compatibilidad con ejercicios basados en v1.

Fuente: https://shopify.github.io/flash-list/docs/fundamentals/performance/

## Formularios y validacion

`app/nueva-nota.tsx` adapta sus campos por tipo:

- Nota: titulo y contenido multilinea.
- Checklist: titulo y lista dinamica de items.
- Idea: titulo, color y etiquetas separadas por coma.

Zod valida minimos antes de crear contenido y cada error se muestra debajo del campo correspondiente.

## Animaciones y feedback tactil

Las tarjetas se envuelven con `Animated.View` y usan `FadeInDown` al entrar y `FadeOutLeft` al salir. Reanimated ejecuta animaciones fluidas apoyandose en la UI thread.

Haptics se usa en dos momentos:

- `impactAsync(ImpactFeedbackStyle.Light)` al eliminar o archivar.
- `notificationAsync(NotificationFeedbackType.Success)` al completar todos los items de un checklist.

Fuentes: https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/ y https://docs.expo.dev/versions/latest/sdk/haptics/
