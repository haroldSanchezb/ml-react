import React, { Component } from 'react';
import logo from '../../img/Logo_ML@2x.png.png';
import searchIcon from '../../img/ic_Search.png';
import styles from './ItemsSearch.scss';

class ItemsSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: new URLSearchParams(props.location.search),
      query: '',
    };

    this._onClick = this._onClick.bind(this);
  }

  _onQueryChange =  (evt) => {
    this.setState({query: evt.target.value});
  }

  _onClick = () => {
    if (this.state.query.trim() !== '') {
      const url = '/items?search=' + this.state.query.replace(' ', '+');
      window.location = url;
    }
  }

  render() {
    return (
      <header className={styles.header}>
        <div className={styles.header__logo}>
          <img src={logo} alt=""/>
        </div>
        <div className={styles.header__search}>
          <input
          onChange={this._onQueryChange}
            type="text"
            placeholder="Nunca dejes de buscar"
            className={styles['header__search-input']}
            defaultValue={this.state.params.get('search')}
          />
          <button onClick={this._onClick} className={styles['header__search-button']}>
            <img src={searchIcon} alt=""/>
          </button>
        </div>
      </header>
    );
  }
}
export default ItemsSearch;
