# vue-pwa-template
A modern, production-ready Vue3 PWA template for building Progressive Web Applications.

## Table of Contents 📋

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Building for Production](#building-for-production)
- [License](#license)
- [Trademark Notice](#trademark-notice)

## Description 📝

This is a Progressive Web App (PWA) built with Vue 3, TypeScript, and Vite. The application includes offline support, push notifications, and installability across all modern browsers.

## Features ✨

- **Progressive Web App (PWA)** - Installable on desktop and mobile devices
- **Offline Support** - Full functionality when internet connection is unavailable
- **Push Notifications** - Real-time notifications on supported devices
- **Responsive Design** - Works seamlessly on all screen sizes
- **Type-Safe** - Built with TypeScript for better code quality
- **Fast & Optimized** - Vite ensures quick build times and optimal performance
- **Service Worker** - Background synchronization and caching strategies

## Tech Stack 🛠️

- **Frontend Framework:** Vue 3 (Composition API with)
- **Backend:** Supabase
- **Language:** JavaScript/TypeScript
- **Build Tool:** Vite
- **UI Components:** PrimeVue
- **Styling:** Tailwind CSS/SCSS
- **Package Manager:** npm / pnpm
- **PWA Support:** Service Workers, Web App Manifest
- **State Management:** [Pinia / Context API - adjust as needed]
- **Testing:** Vitest

## Requirements 📦

- **Node.js:** v16.0.0 or higher
- **npm:** v7.0.0 or higher (or `pnpm` v6.0.0+)
- **Modern Browser:** Chrome, Firefox, Safari, Edge with ES2020+ support
- **For best experience:** Google Chrome (for PWA installation)

## Installation 🚀

1. **Clone the repository**
   ```bash
   git clone https://github.com/davidpantelic/vue-pwa-template.git
   cd vue-pwa-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   The app will be available at `http://localhost:5173`

## Usage 💻

### Development

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Tests

```bash
npm run test
```

### Lint Code

```bash
npm run lint
```

## Configuration ⚙️

### PWA Installation

To install the app:

- **Desktop (Chrome/Edge):** Click the install button in the app or in the address bar
- **Android (Chrome):** Click the install button in the app OR Menu/Settings → Install app
- **iOS (Safari):** Share → Add to Home Screen

### Push Notifications

Users can enable notifications by clicking the notification icon. The app will request permission and display notifications on supported devices.

### Offline Mode

The app automatically caches essential resources. When offline, a network indicator appears in the UI. Data syncs automatically when connection is restored.

## Building for Production 🏗️

```bash
# Build the application
npm run build

# Preview the production build locally
npm run preview

# Deploy to your hosting service
```

The `dist/` folder contains the production-ready files ready for deployment.

## License 📄

MIT © Webdak

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

## Trademark Notice ™️

The name **Webdak**, the Webdak logo, and related branding
are trademarks of Webdak.

This license does not grant permission to use the
trade names, trademarks, service marks, or logos of Webdak,
except as required for reasonable and customary use
in describing the origin of the software.

---

**Built by Webdak/David Pantelic**

For questions and support, please contact me at [davidpantelic1996@gmail.com](mailto:davidpantelic1996@gmail.com)
