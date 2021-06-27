exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPreset({
    name: "@linaria/babel-preset"
  })
  actions.setBabelPlugin({
    name: "@babel/plugin-transform-react-jsx",
    options: {
      runtime: "automatic",
    },
  })
}
