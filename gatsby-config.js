const isProduction = process.env.NODE_ENV === 'production'

module.exports.siteMetadata = {
  title: 'X3 Token',
}

const manifest = {
  name: 'X3 Token',
  short_name: 'X3',
  start_url: '/',
  background_color: '#663399',
  theme_color: '#663399',
  display: 'minimal-ui',
  icon: 'src/images/gatsby-icon.png',
}

module.exports.plugins = [
  'gatsby-plugin-react-helmet',
  {
    resolve: `gatsby-plugin-manifest`,
    options: manifest,
  },
  'gatsby-plugin-offline',
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      // precision: 8,
    },
  },
  {
    resolve: `gatsby-plugin-emotion`,
    options: {
      hoist: true,
      autoLabel: true,
      sourceMap: !isProduction,
    },
  },
]
