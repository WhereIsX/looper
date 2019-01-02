import React, { Component } from 'react';
import {connect} from 'react-redux'
// import VarDisplay from './components/varDisplay';

class Animation extends Component {

  states_display = () => {
    const {all_states, current_state} = this.props.state

    return (
      <div>
        {all_states[current_state]}
      </div>
    )
  }


  render(){

    console.log("Inherited States", this.props);

    console.log("To Be Displayed ", this.props.state.all_states[this.props.state.current_state])

    return(
      <div>
          <p> Let me show you how that looks! </p>
          <br></br>
          {this.states_display()}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {state}
}

export default connect(mapStateToProps)(Animation)
