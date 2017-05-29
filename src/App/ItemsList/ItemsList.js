import React, { Component } from 'react';
import { graphql, QueryRenderer } from 'react-relay';
import environment from '../createRelayEnvironment';
import ItemsListItem from './ItemsListItem';
import styles from './ItemsList.scss';

const Items = ({ search }) => (
  <main className={styles.items}>
    {search.items.map((item, key) => ( <ItemsListItem key={key} item={item} />))}
  </main>
);

const RenderApp = ({ error, props }) => {
  if (error || !props) {
    return null;
  }

  return (
    <Items  {...props} />
  );
};

class ItemsList extends Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search);

    this.state = {
      search: params.get('search').replace(' ', '+'),
    };
  }

  render() {
    const query = graphql`
      query ItemsListQuery($searchId: ID!) {
        search (id: $searchId) {
          items {
            productId,
            title
          }
        }
      }
    `;

    const variables = {
      searchId: this.state.search,
    };

    return (
      <QueryRenderer environment={environment} query={query} variables={variables} render={RenderApp} />
    );
  }
}
export default ItemsList;
