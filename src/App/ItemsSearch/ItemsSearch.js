import React, { Component } from 'react';
import { Redirect } from 'react-router';
import logo from '../../img/Logo_ML@2x.png.png';
import searchIcon from '../../img/ic_Search.png';
import styles from './ItemsSearch.scss';

class ItemsSearch extends Component {
  state = {
    query: '',
    redirect: false,
  }

  _onQueryChange =  (evt) => {
    this.setState({query: evt.target.value});
  }

  _onClick = () => {
    if (this.state.query.trim() !== '') {
      this.setState({redirect: true});
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={'/items?search=' + this.state.query.replace(' ', '+')} />;
    }

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
