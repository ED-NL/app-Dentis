
<div align="center">
  <img src="assets/images/dental-logo.png" alt="Logo de Dentis" width="220" />
</div>

# Dentis (Expo)

Aplicación móvil y web para gestionar una consulta odontológica, desarrollada
con Expo (React Native) y TypeScript. Incluye autenticación local, perfil de
paciente, odontograma y una agenda de turnos con calendario y filtros por estado.

## Integrantes
- Edgar Narvaez Lavalle
- Rodrigo Good
- Lily Narvaez Lavalle
- Jesus Incarbone


## Tecnologías

- [Expo](https://expo.dev) (SDK 57) + Expo Router (navegación por archivos)
- React Native 0.8x, [React](https://react.dev) 19
- [Zustand](https://zustand.docs.pmnd.rs) — estado global
- TypeScript 6

## Funcionalidades

- **Login** con validación de campos (email/contraseña).
- **Perfil de paciente**: datos personales, alergias, antecedentes e historial clínico.
- **Odontograma**: mapa dental interactivo con color por estado de cada pieza.
- **Agenda**: calendario de turnos, citas del día seleccionado y próximas citas.
- **Filtros de citas**: pestañas "Todas" y "Por estado" (Pendiente / Confirmada).
- **Tema claro/oscuro** según el esquema de color del dispositivo.

## Estructura

```
dentis/
├── App.js                    # punto de entrada de Expo Router
├── src/
│   ├── app/                  # pantallas (rutas): index, explore, _layout
│   ├── components/           # LoginScreen, AccountScreen, calendar, tabs…
│   ├── constants/            # mockPatient (datos de prueba), theme
│   ├── hooks/                # color-scheme, theme
│   └── store/                # auth-store.ts (estado global con Zustand)
├── assets/                   # imágenes e íconos
└── package.json
```

## Ejecutar

```bash
npm install
npx expo start          # menú interactivo
npx expo start --web    # navegador
npx expo start --android
npx expo start --ios
```

Escaneá el QR con la app Expo Go (Android/iOS) para probar en un dispositivo real.

## Scripts

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor Expo (puerto 8589) |
| `npm run web` | Abre en el navegador |
| `npm run android` | Corre en emulador Android |
| `npm run ios` | Corre en simulador iOS |
| `npm run lint` | Lint con `expo lint` |

## Licencia

MIT