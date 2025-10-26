# React + TypeScript + Vite

A simple Todo app frontend built with **React**, **TypeScript**, and **Vite**.

## 🚀 Tech Stack
- React 19
- TypeScript
- Vite
- Vitest (testing)
- ESLint (linting)

## 🧰 Requirements
- Node.js 18+
- npm / yarn / pnpm
- Docker *(optional)*

## 📦 Installation
```bash
npm install
```

## 🧪 Available Scripts
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm run test        # Run unit tests
npm run test:coverage  # Run tests with coverage
npm run test:ui     # Run Vitest UI
```

## 🧭 Development
Start the app:
```bash
npm run dev
```
Visit: [http://localhost:5173](http://localhost:5173)

## 🏗️ Build
```bash
npm run build
```

## 🧪 Testing
```bash
npm run test
npm run test:coverage
npm run test:ui
```

## 🧼 Linting
```bash
npm run lint
```

## 🐳 Docker

This repo includes a Dockerfile that builds the production bundle and serves it using Vite Preview.

- Container port: 3000 (see `vite.config.ts` preview.port)
- Host binding: 0.0.0.0 (see `vite.config.ts` preview.host)

Build the image:
```cmd
docker build -t todo-frontend .
```

Run the container and map the port:
```cmd
docker run --rm -p 3000:3000 todo-frontend
```

Open the app at:
```
http://localhost:3000`



## 📁 Project Structure
```
src/          # source files
public/       # static assets
Dockerfile    # optional containerization
```

---

