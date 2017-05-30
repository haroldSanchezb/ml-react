import React, { Component } from 'react';
import { graphql, QueryRenderer } from 'react-relay';
import environment from '../createRelayEnvironment';
import styles from './ItemsDetail.scss';

const Item = ({ product }) => (
  <section className={styles.item}>
  </section>
);

const RenderApp = ({ error, props }) => {
  if (error || !props) {
    return null;
  }

  return (
    <main className={styles.main}>
      <Item  {...props} />
    </main>
  );
};

class ItemsDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: props.location.pathname.replace('/items/', ''),
    };
  }

  render() {
    const query = graphql`
      query ItemsDetailQuery($productId: ID!) {
        product (id: $productId) {
          title,
          productId,
          description,
          price {
            currency
            amount
            decimals
          },
          picture,
          condition,
          shipping,
          city
        }
      }
    `;

    const variables = {
      productId: this.state.productId,
    };

    return (
      <QueryRenderer environment={environment} query={query} variables={variables} render={RenderApp} />
    );
  }
}
export default ItemsDetail;
