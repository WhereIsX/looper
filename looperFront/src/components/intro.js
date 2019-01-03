import React, { Component } from 'react';

// MaterialUI
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles.js'
import Typography from '@material-ui/core/Typography';


class Intro extends Component {
  render(){
    return(
      <div>
        <Typography variant="h4" gutterBottom>
          Welcome to Looper!
        </Typography>
        <Typography variant="caption" gutterBottom>
          We think loops are cool... so give us a `.each` loop
          and let us animate it for you!
        </Typography>
      <br/>
      </div>
    )
  }
}


export default withStyles(styles)(Intro)
