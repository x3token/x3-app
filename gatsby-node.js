exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  rules,
  loaders,
  actions,
}) => {
  if (stage === 'develop') {
    console.log('[Develop] Deploying to Development Network')

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
}
