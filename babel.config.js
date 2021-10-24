module.exports = {
  plugins: [
    "babel-plugin-remove-graphql-queries"
  ],
  presets: [
    "babel-preset-gatsby",
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
  ],
}
