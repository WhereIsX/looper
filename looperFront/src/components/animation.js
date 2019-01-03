import React, { Component } from 'react';
import {connect} from 'react-redux'
import {nextState} from '../redux/actions'
import {prevState} from '../redux/actions'

// MaterialUI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles.js'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


class Animation extends Component {

  displayCurrentState = () => {
    const {all_states, current_state} = this.props
    const this_state = all_states[current_state]

    return (
      this_state.map( (variable, index) =>
        <Typography key={index} variant="subtitle1" gutterBottom>
          {variable}
        </Typography>
      )
    )
  }

  handleNextClick = () => { this.props.nextState() }
  handlePrevClick = () => { this.props.prevState() }

  displayButtons = () => {
    const {all_states, current_state} = this.props
    const totalStates = all_states.length - 1
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="h6" align="center" gutterBottom>
          <br></br>
        <Button className={classes.button} variant="outlined" size="small"
          disabled={current_state === 0 } onClick={this.handlePrevClick}>
          Prev
        </Button>
        <Button className={classes.button} variant="outlined" size="small"
          disabled={current_state >= totalStates} onClick={this.handleNextClick}>
          Next
        </Button>
        </Typography>
      </div>
    )
  }

  render(){

    return(
      <div>
        <Typography variant="h6" align="center" gutterBottom>
          Let's see this loop
        </Typography>
        <br></br>
        { this.displayCurrentState() }
        <br></br>
        { this.displayButtons() }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    all_states: state.all_states,
    current_state: state.current_state
  }
}

Animation.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, {nextState, prevState})(withStyles(styles)(Animation))
