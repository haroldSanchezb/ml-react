import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemsPage from './ItemsPage';

const App = () => (
  <Router>
    <Switch>
        <Route exact path="/" component={ItemsPage} />
        <Route path="/items" component={ItemsPage} />
        <Route path="/items/:id" component={ItemsPage} />
      </Switch>
  </Router>
);

export default App;
