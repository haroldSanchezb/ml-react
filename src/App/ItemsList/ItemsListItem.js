import React, { Component } from 'react';
import styles from './ItemsList.scss';
import {  Link } from 'react-router-dom';
import shippingIcon from '../../img/ic_shipping@2x.png.png';
import { FormattedNumber } from 'react-intl';


class ItemsListItem extends Component {
  render() {
    const item = this.props.item;
    return (
      <li className={styles['items__list-item']}>
        <Link  className={styles['items__list-item__link']} to={'/items/' + item.productId}>
          <img className={styles['items__list-item__thumbnail']} src={item.thumbnail} alt=""/>
          <span className={styles['items__list-item__price']}>
            <FormattedNumber
              value={item.price.amount + '.' + item.price.decimals}
              style="currency"
              currency={item.price.currency}
            />
          </span>
          <span className={styles['items__list-item__shipping']}>
            {item.shipping &&
              <img src={shippingIcon} alt=""/>
            }
          </span>
          <h3 className={styles['items__list-item__title']}>{item.title}</h3>
          <span className={styles['items__list-item__city']}>{item.city.toLowerCase()}</span>
        </Link>
      </li>
    );
  }
}
export default ItemsListItem;
