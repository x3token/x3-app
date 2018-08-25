exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  rules,
  loaders,
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.sol/,
          use: [
            'json-loader',
            {
              loader: 'truffle-solidity-loader',
              options: {
                network: 'development',
              },
            },
          ],
        },
      ],
    },
  })
}
