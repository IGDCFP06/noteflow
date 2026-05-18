# Gestion del proyecto

## Tablero

No hay conector de Trello ni credenciales disponibles en este entorno, asi que el tablero remoto queda pendiente de creacion manual. La estructura preparada para Trello es:

- Backlog
- Todo
- In Progress
- Review
- Done

Cuando se cree el tablero real, el enlace debe añadirse al `README.md` en la seccion de gestion.

## Tarjetas y subtareas

### App base Expo

- Crear proyecto `blank-typescript`.
- Instalar dependencias compatibles con Expo SDK.
- Configurar Expo Router, scheme y typed routes.
- Configurar alias `@/*`.

### Sistema de diseno

- Comparar Gluestack UI y React Native Paper.
- Instalar Gluestack UI v5 alpha con UniWind/manual fallback.
- Crear tokens en `constants/theme.ts`.
- Implementar provider de tema.
- Verificar modo claro y oscuro.

### Navegacion

- Crear tabs principales.
- Crear stacks internos por seccion.
- Crear rutas dinamicas `[id]`.
- Crear modal `nueva-nota`.

### Datos y estado

- Definir interfaces TypeScript.
- Crear type guards.
- Implementar store Zustand.
- Integrar persistencia con AsyncStorage.
- Gestionar rehidratacion.

### Listas y tarjetas

- Crear `NoteCard`.
- Crear `ChecklistCard`.
- Crear `IdeaCard`.
- Crear componente comun de lista con FlashList.
- Añadir busqueda en tiempo real.
- Añadir animaciones con Reanimated.

### Formularios

- Crear selector de tipo.
- Crear formulario de nota.
- Crear formulario de checklist con items dinamicos.
- Crear formulario de idea con color y etiquetas.
- Mostrar errores de Zod debajo de campos.
- Ajustar teclado con `KeyboardAvoidingView`.

### UX y detalle

- Crear pantallas de detalle.
- Implementar eliminar con `Alert.alert`.
- Implementar archivar y restaurar.
- Añadir haptics.
- Crear estados vacios.

### Documentacion

- Documentar idea.
- Documentar teoria React Native.
- Documentar gestion del proyecto.
- Documentar setup de IA.
- Actualizar README.

## Flujo de trabajo

El flujo previsto es mover una tarjeta a `In Progress` al empezar una funcionalidad, pasarla a `Review` cuando el codigo compila y la pantalla se puede probar, y moverla a `Done` tras validacion en simulador o `npm run typecheck`.
