import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals: {
        ...globals.browser, 
        ...globals.node,
        ...globals.jest // Esto soluciona los errores de describe, test y expect en tus pruebas
      } 
    } 
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    // Bloque personalizado para apagar las reglas molestas de React
    rules: {
      "react/prop-types": "off",          // Apaga la exigencia de propTypes
      "react/react-in-jsx-scope": "off",   // Apaga la obligación de importar React en cada archivo JSX
    },
  },
  
]);