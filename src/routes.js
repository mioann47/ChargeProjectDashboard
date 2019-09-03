import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'

import ScrollToTop from './components/ScrollTop'
import DataReporting from './containers/DataReporting'
import Dashboard from './containers/Dashboard'
import ExampleLive from './containers/ExampleLive'
import NotFound from "./containers/NotFound";



import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import GA from './components/utils/GoogleAnalytics'



const props = ({ store }) => (
  <Provider store={store}>
    <HashRouter >
      <ScrollToTop>
      {<GA.RouteTracker /> }
        <Switch>
          <Route exact path='/' component={ Dashboard } />
          <Route exact path='/Dashboard' component={ Dashboard } />
          <Route exact path='/DataReporting' component={ DataReporting } />
          <Route exact path='/Live' component={ ExampleLive } />
          <Route component={NotFound} />
        </Switch>
      </ScrollToTop>
    </HashRouter>
    </Provider>
  )

  props.propTypes = {
    store: PropTypes.object.isRequired
  }

  export default props;