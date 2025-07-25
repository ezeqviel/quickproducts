# QuickProducts

**QuickProducts** es una app full-stack que permite a usuarios gestionar productos de forma sencilla.  
Cada usuario puede crear productos con nombre, descripción, precio y asignar otros usuarios como responsables, visualizar, filtrar y eliminar sus propios productos.

## Funcionalidades principales

- Registro e inicio de sesión con auth por JWT
- CRUD de productos por user
- Asignación de múltiples usuarios a un producto
- Visualización y filtrado de productos por nombre

## Stack

- Backend: NestJS, MongoDB, Mongoose, JWT
- Frontend: React + Vite, Tailwind CSS
- Auth: JSON Web Tokens (JWT)

## Instalación

Una vez descargado el repo:

### Frontend
```sh
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run start:dev
```

## Estructura de proyecto
### Backend
```sh
backend
├── README.md
├── eslint.config.mjs
├── nest-cli.json
├── node_modules
├── package-lock.json
├── package.json
├── src
├── test
├── tsconfig.build.json
└── tsconfig.json
```

### Frontend
```sh
frontend
├── README.md
├── eslint.config.js
├── index.html
├── node_modules
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```