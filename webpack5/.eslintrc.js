module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "no-undef": ["off"],
    "no-unused-vars": ["warn"]
  },
  "parserOptions": {
    "sourceType": "module",
    "parser":"@babel/eslint-parser",
    "parserOptions": {
      "requireConfigFile": "false"
    },
    "ecmaFeatures": {
      "legacyDecorators": "true"
    },
  },
  "plugins": [
    "@babel"
  ]
};
