# Idea de NoteFlow

## Problema que resuelve

NoteFlow resuelve la captura dispersa de informacion diaria. Muchas personas mezclan notas largas, listas accionables e ideas sueltas en chats, documentos o apps distintas. El resultado es friccion para encontrar algo, convertir una idea en accion o revisar lo pendiente al final del dia.

La propuesta es una app movil ligera que separa tres flujos mentales:

- Notas: texto con contexto suficiente para recordar una decision, reunion o aprendizaje.
- Tareas: checklists operativas para cerrar trabajo sin abrir una herramienta pesada.
- Ideas: apuntes rapidos con etiquetas y color para volver a ellos cuando haya energia creativa.

## Usuario objetivo

El usuario objetivo es un estudiante, freelance, creador o profesional que captura informacion varias veces al dia desde el movil. Usaria NoteFlow en trayectos, entre clases, durante reuniones o al cerrar la jornada.

En su dia a dia:

- Abre Notas para guardar una explicacion, resumen o decision.
- Abre Tareas para crear una lista concreta de pasos.
- Abre Ideas para guardar conceptos aun poco definidos y recuperarlos por etiqueta.
- Usa la busqueda para encontrar contenido sin recordar en que tipo lo guardo.
- Archiva elementos que no quiere ver en las vistas principales pero tampoco desea borrar.

## Funcionalidades principales de la primera version

- Proyecto Expo con TypeScript y Expo Router.
- Navegacion principal por tabs: Notas, Tareas, Ideas y Archivo.
- Rutas de detalle por id para cada tipo de contenido.
- Modal de creacion con formulario adaptable por tipo.
- Validacion de formularios con Zod.
- Store global con Zustand.
- Persistencia local con AsyncStorage.
- Tarjetas visualmente distintas para notas, checklists e ideas.
- Listas con FlashList y animaciones de entrada/salida con Reanimated.
- Busqueda en tiempo real en cada pestaña.
- Modo claro y oscuro mediante `useColorScheme`.
- Feedback haptico al eliminar y al completar todos los items de un checklist.
- Estado vacio por pestaña.

## Funcionalidades opcionales futuras

- Sincronizacion entre dispositivos.
- Recordatorios y notificaciones locales.
- Edicion completa de contenido existente.
- Adjuntos de imagen/audio.
- Etiquetas globales compartidas entre notas e ideas.
- Vista calendario o timeline.
- Exportacion a Markdown.
- Cifrado local de notas sensibles.
- Widgets para captura rapida desde la pantalla de inicio.
- Colaboracion o notas compartidas.
