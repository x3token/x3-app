import {extractCritical} from 'emotion-server'

import webpack from './webpack.config.js'

import Document from './src/common/Document'

const siteRoot = 'https://passionnest.com'

export default {
  siteRoot,
  webpack,
  Document,
  getRoutes: async () => [
    {
      path: '/',
      component: 'src/landing',
    },
    // {
    //   path: '404',
    //   component: 'src/pages/404',
    // },
  ],
  renderToHtml: (render, Component, meta) => {
    const html = render(Component)
    meta.css = extractCritical(html).css
    return html
  },
  disableRouteInfoWarning: true,
}
