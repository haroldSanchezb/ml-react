import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemsSearch from './ItemsSearch';
import ItemsList from './ItemsList';
import ItemsDetail from './ItemsDetail';

const App = () => (
  <Router>
    <Switch>
        <Route exact path="/" component={ItemsSearch} />
        <Route path="/items?search=:query" component={ItemsList} />
        <Route path="/items/:id" component={ItemsDetail} />
      </Switch>
  </Router>
);

export default App;
