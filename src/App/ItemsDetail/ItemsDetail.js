import React, { Component } from 'react';
import { graphql, QueryRenderer } from 'react-relay';
import environment from '../createRelayEnvironment';
import { FormattedNumber } from 'react-intl';
import ItemsCategory from '../ItemsCategory';
import styles from './ItemsDetail.scss';

const Item = ({ product }) => (
  <section className={styles.item}>
    <section  className={styles.item__content}>
      <img className={styles['item__content-picture']} src={product.picture} alt=""/>
      <h2 className={styles['item__content-text']}>Descripci&oacute;n del producto</h2>
    </section>
    <section
      className={styles.item__description}
      dangerouslySetInnerHTML={{__html: product.description}}>
    </section>
    <section  className={styles.item__detail}>
      <span className={styles['item__detail-condition']}>{product.condition === 'new' ? 'Nuevo' : 'Usado'}</span>
      <span className={styles['item__detail-sold']}>{' - ' + product.sold + ' vendidos'}</span>
      <h3 className={styles['item__detail-title']}>{product.title}</h3>
      <p className={styles['item__detail-price']}>
        <FormattedNumber
          value={product.price.amount + '.' + product.price.decimals}
          style="currency"
          currency={product.price.currency}
        />
      </p>
      <button className={styles['item__detail-button']}>
        <span>Comprar</span>
      </button>
    </section>
  </section>
);

const RenderApp = ({ error, props }) => {
  if (error || !props) {
    return null;
  }

  document.title = props.product.title.concat(' - Mercado Libre');

  return (
    <main className={styles.main}>
      <ItemsCategory  {...props} />
      <Item  {...props} />
    </main>
  );
};

class ItemsDetail extends Component {
  render() {
    const query = graphql`
      query ItemsDetailQuery($productId: ID!) {
        product (id: $productId) {
          categories {
            name
          },
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
          city,
          sold
        }
      }
    `;

    const variables = {
      productId: this.props.location.pathname.replace('/items/', '').replace('/', ''),
    };

    return (
      <QueryRenderer environment={environment} query={query} variables={variables} render={RenderApp} />
    );
  }
}
export default ItemsDetail;
