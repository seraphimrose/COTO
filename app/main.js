import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/lib/index.css'

import createRoot from 'api/createRoot'
import createStore from 'api/createStore'

import reducers from 'reducer'
import routes from 'config/routes'

const store = createStore(reducers)
const Root = createRoot(store, routes)

ReactDOM.render(<Root />, document.getElementById('app'))