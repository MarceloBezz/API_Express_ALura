import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "quotes": ["error", "double"],
      "semi": ["error", "always"]
    }
  },
  pluginJs.configs.recommended,
];
