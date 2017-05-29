import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ItemsSearch from './ItemsSearch';
import ItemsList from './ItemsList';
import ItemsDetail from './ItemsDetail';

const ItemsPage = props => (
  <div className="container">
    <ItemsSearch {...props} />
    <Switch>
      <Route path="/items/:id" render={() => <ItemsDetail {...props} />} />
      <Route exact path={props.match.url} render={() => <ItemsList {...props} />} />
    </Switch>
  </div>
);

export default ItemsPage;
