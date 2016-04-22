import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/lib/index.css'

import createRoot from 'api/createRoot'
import createSuperStore from 'api/createSuperStore'

import reducers from 'reducer'
import routes from 'config/routes'

const store = createSuperStore(reducers)
const Root = createRoot(store, routes)


ReactDOM.render(<Root />, document.getElementById('app'))