module.exports = {
  extends: "benwainwright",
  parserOptions: {
    project: ["./tsconfig.json", "./cypress/tsconfig.json"],
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/prefer-node-protocol": "off",
    "filenames/naming-convention": "off",
  },
  overrides: [
    {
      files: ["./src/infrastructure/**/*"],
      rules: {
        "no-new": "off",
        "filenames/match-regex": "off",
      },
    },
  ],
}
