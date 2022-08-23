module.exports = {
  settings: {
    react: {
      createClass: "createReactClass",
      pragma: "React",
      fragment: "Fragment",
      version: "detect",
      flowVersion: "0.53",
    },
    propWrapperFunctions: [
      "forbidExtraProps",
      { property: "freeze", object: "Object" },
      { property: "myFavoriteWrapper" },
      { property: "forbidExtraProps", exact: true },
    ],
    componentWrapperFunctions: [
      "observer",
      { property: "styled" },
      { property: "observer", object: "Mobx" },
      { property: "observer", object: "<pragma>" },
    ],
    formComponents: ["CustomForm", { name: "Form", formAttribute: "endpoint" }],
    linkComponents: ["Hyperlink", { name: "Link", linkAttribute: "to" }],
  },

  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "plugin:react/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "error",
    "react/display-name": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "no-empty": 0,
    "no-unsafe-optional-chaining": 0,
    "react/jsx-key": "off",
    "@typescript-eslint/no-empty-function": "off",
  },
};
