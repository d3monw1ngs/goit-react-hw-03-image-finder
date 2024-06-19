import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './Button.module.css';

export class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };
  
  render() {
    return (
      <button className={styles.button} onClick={this.props.onClick}>
          Load more
      </button>
    );
  }
}
