# Google Developer Group (GDG) On Campus, University of Wisconsin-Green Bay
# Hack GB

## Project creation info - Vite Framework 
First, there were added the frontend and backend directories. Then, changed directory in the terminal by typing --> cd frontend.
Lastly, the project was created by running in terminal --> npm create vite@latest 
→ name project (Can use the command "dot + front-slash" ( ./ )  to create the project under the current folder if already created one) →   React   →   Typescript  →   Use Rolldown-vite (Experimental)   →   Use npm for installation and run



## Installed Packages: 
1. Tailwind (styling): npm install tailwindcss @tailwindcss/vite
2. React Router (to handle different pages): npm install react-router-dom
3. Page load animations: npm i framer-motion
4. Lucide icons (React standard): npm install lucide-react
5. Font Awesome:
    → npm install --save @fortawesome/react-fontawesome
    → npm i --save @fortawesome/free-solid-svg-icons
    → npm i --save @fortawesome/free-regular-svg-icons
    → npm i --save @fortawesome/free-brands-svg-icons
6. Carousel component: 
    → npm install embla-carousel-react
    → npm i embla-carousel-autoplay embla-carousel-auto-scroll
7. Markdown reader (to read data.ts files markdown): 
    → npm i react-markdown
    → npm install react-markdown remark-gfm remark-breaks
8. React Responsive: npm i react-responsive

## Configure Tailwind properly
After installing tailwind's package (point 1. above), is required to import tailwind's package in vite.config.ts file. Visit https://tailwindcss.com/docs/installation/using-vite for more information.


## General Notes:
1. Terminal command to test proyect: npm run dev  
2. Shortcut to create new react .tsx file: rafce + tab
3. To create a different page: Add a .tsx file (equivalence to index.html) inside the 'src/pages/' directory. Then, set up page route in src/App.tsx component.
4. Push to github: (1) git add . | (2) git commit -m "message" | (3) git push 
5. Create a new code snippet (used for 'proj' template): ctrl+Shift+p → 'Snippets: Configure Snippets' → typescript.json → Add a new item to the Snippets array.



## Learning Notes:
1. .ts (TypeScript) is used for files with only TypeScript code — like utility functions, interfaces, constants, types, and config files. No JSX allowed here.
2. .tsx (TypeScript + JSX) is used for files that contain JSX or React components, like return (<div>Hello</div>). Must  use .tsx if the file includes any JSX (JavaScript XML).



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
