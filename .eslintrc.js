module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true
    },
    project: ["./tsconfig.json"],
  },
  plugins: [
    "@typescript-eslint",
    "react", 
    "react-hooks"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/warnings",
  ],
  settings: {
    react: {
      "pragma": "React",
      "version": "detect"
    }
  },
  rules: {
    "no-case-declarations": "off",
    "import/no-named-as-default": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/prop-types": "off"
  }
};