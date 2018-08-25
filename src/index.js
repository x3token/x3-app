import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'

import App from './common/App'

import web3 from './utils/web3'

if (process.env.NODE_ENV !== 'development' && typeof window !== 'undefined') {
  require('offline-plugin/runtime').install()
}

if (typeof document !== 'undefined') {
  window.web3 = web3

  const renderMethod = module.hot
    ? ReactDOM.render
    : ReactDOM.hydrate || ReactDOM.render

  const render = Component => {
    renderMethod(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById('root'),
    )
  }

  render(App)

  if (module.hot) {
    module.hot.accept('./common/App', () =>
      render(require('./common/App').default),
    )
  }
}

export default App
