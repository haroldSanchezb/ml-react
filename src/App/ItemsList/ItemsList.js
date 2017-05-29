import React, { Component } from 'react';
// import ItemsSearch from '../ItemsSearch';

class ItemsList extends Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(props.location.search);

    this.state = {
      search: params.get('search'),
    };
  }

  render() {
    return (
        <main>{this.state.search}</main>
    );
  }
}
export default ItemsList;
