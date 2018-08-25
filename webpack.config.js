import OfflinePlugin from 'offline-plugin'
import WebpackPwaManifest from 'webpack-pwa-manifest'

import autoprefixer from 'autoprefixer'
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
      }),
    ],
  },
}

const manifest = {
  name: 'Passion Nest',
  display: 'standalone',
  short_name: 'Passion Nest',
  description: 'Bring Your Passion to Life',
  background_color: '#ffffff',
  icons: [],
  orientation: 'portrait',
  start_url: '.',
  inject: false,
  ios: false,
  fingerprints: true,
  filename: 'manifest.json',
  publicPath: '/',
}

export default function(config, {stage}) {
  const isDev = stage === 'dev'

  if (stage === 'prod') {
    config.plugins.push(new WebpackPwaManifest(manifest))
    config.plugins.push(new OfflinePlugin())
  }

  config.optimization = {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  }

  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders: 1,
    },
  }

  const styleLoader = [cssLoader, postcssLoader, 'sass-loader']

  if (stage === 'dev') {
    styleLoader.unshift('style-loader')
  }

  if (stage === 'prod') {
    styleLoader.unshift(ExtractCssChunks.loader)
  }

  config.module.rules[0].oneOf.unshift({
    test: /.(scss|sass)$/,
    use: styleLoader,
  })

  config.module.rules[0].oneOf.unshift({
    test: /\.sol/,
    loader: 'truffle-solidity',
  })

  return config
}
