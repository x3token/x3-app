exports.modifyWebpackConfig = ({config, stage}) => {
  config.loader({
    test: /\.sol/,
    loader: 'truffle-solidity',
  })

  return config
}
