import React, { Component } from 'react';
import styles from './ItemsList.scss';

class ItemsListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: props.item,
    };

    this._onClick = this._onClick.bind(this);
  }

  _onClick = () => {
    const url = '/items/' + this.state.item.productId;
    window.location = url;
  }

  render() {
    return (
      <div className="lala">{this.state.item.title}</div>
    );
  }
}
export default ItemsListItem;
