import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ItemsSearch from './ItemsSearch';
import ItemsList from './ItemsList';
import ItemsDetail from './ItemsDetail';
import styles from './ItemsPage.scss';

const ItemsPage = props => (
  <div className={styles.container}>
    <ItemsSearch {...props} />
    <Switch>
      <Route path="/items/:productId" render={() => <ItemsDetail {...props} />} />
      <Route path="/items" render={() => <ItemsList {...props} />} />
    </Switch>
  </div>
);

export default ItemsPage;
