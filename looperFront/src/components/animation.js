import React, { Component } from 'react';
import {connect} from 'react-redux'
import {nextState} from '../redux/actions'
import {prevState} from '../redux/actions'


// import VarDisplay from './components/varDisplay';

class Animation extends Component {

  displayCurrentState = () => {
    const {all_states, current_state} = this.props.state
    let this_state = all_states[current_state]
    console.log("This state is: ", this_state)

    return (
      <div>
        {all_states[current_state]}
      </div>
    )
  }

  handleNextClick = () => { this.props.nextState() }
  handlePrevClick = () => { this.props.prevState() }

  render(){

    return(
      <div>
        <p> Let me show you how that looks! </p>
        <br></br>
        {this.displayCurrentState()}
        <br></br>
        <button onClick={this.handleNextClick}> Next </button>
        <button onClick={this.handlePrevClick}> Previous </button>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps, {nextState, prevState})(Animation)
