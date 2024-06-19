import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

export class Searchbar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    state = { query: '' };
    
    handleChange = (event) => {
        this.setState({ query: event.target.value });
    };

     handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    };

    render() {

        return (
          <header className={styles.searchbar}>
              <form className={styles.form} onSubmit={this.handleSubmit}>
                  <button type="submit" className={styles.button}>
                  <span className={styles.buttonLabel}>Search</span>
                  </button>
      
                  <input
                  className={styles.input}
                  type="text"
                  value={this.state.query}
                  onChange={this.handleChange}
                  autoComplete="off"
                  autoFocus
                  placeholder="Search images and photos"
                  />
              </form>
          </header>
        );
    }
}
