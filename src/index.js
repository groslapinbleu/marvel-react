import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import NotFound from './component/NotFound'
// import * as serviceWorker from './serviceWorker'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import PreferredList from './component/PreferredList'

// import defaultContext from './component/defaultContext'
import DataContext from './component/DataContext'


const Root = () => (
  <DataContext.Provider value={
    {
      data: [],
      selectedData: [],
    }}>
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/favorites' component={PreferredList} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </DataContext.Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister()

