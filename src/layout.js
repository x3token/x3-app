import React from 'react'
import Helmet from 'react-helmet'
import {StaticQuery, graphql} from 'gatsby'

import 'animate.css'

import './style.sass'

const meta = [
  {name: 'description', content: 'Sample'},
  {name: 'keywords', content: 'sample, something'},
]

const Layout = ({children}) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet title={data.site.siteMetadata.title} meta={meta}>
          <html lang="en" />
        </Helmet>

        {children}
      </>
    )}
  />
)

export default Layout
