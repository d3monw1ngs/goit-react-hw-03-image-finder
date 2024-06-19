import React, { Component } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import styles from './Loader.module.css';

export class Loader extends Component {
  render () {    
    return (
      <div className={styles.loader}>
          <ThreeCircles color="#00BFFF" height={80} width={80} />
      </div>
    );
  }
}
