import React, { Component } from 'react';
import styles from './ItemsCategory.scss';

class ItemsCategory extends Component {
  render() {
    const categories = this.props.search ? this.props.search.categories : this.props.product.categories;
    return (
      <ul className={styles.category__list}>
      {categories.map((category, key) => ( <li className={styles['category__list-item']} key={key}>{category.name}</li>))}
      </ul>
    );
  }
}
export default ItemsCategory;
