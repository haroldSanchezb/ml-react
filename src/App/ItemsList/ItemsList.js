import React, { Component } from 'react';
import { graphql, QueryRenderer } from 'react-relay';
import environment from '../createRelayEnvironment';
import ItemsCategory from '../ItemsCategory';
import ItemsListItem from './ItemsListItem';
import styles from './ItemsList.scss';

const Items = ({ search }) => (
  <ol className={styles.items__list}>
    {search.items.map((item, key) => ( <ItemsListItem key={key} item={item} />))}
  </ol>
);

const RenderApp = ({ error, props }) => {
  if (error || !props) {
    return null;
  }

  return (
    <main className={styles.main}>
      <ItemsCategory  {...props} />
      <Items  {...props} />
    </main>
  );
};

class ItemsList extends Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search);
    document.title = params.get('search').concat(' - Mercado Libre');

    this.state = {
      search: params.get('search').replace(' ', '+'),
    };
  }

  render() {
    const query = graphql`
      query ItemsListQuery($searchId: ID!) {
        search (id: $searchId) {
          categories {
            name
          },
          items {
            title,
            productId,
            description,
            price {
              currency
              amount
              decimals
            },
            thumbnail,
            condition,
            shipping,
            city
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
