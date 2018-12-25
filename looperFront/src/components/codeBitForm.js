import React, { Component } from 'react'
import {connect} from 'react-redux'

// import { Button, Checkbox, Form } from 'semantic-ui-react'

class CodeBitForm extends Component {

  state = {
    collection: "",
    element: "",
    block:"",
    vars: [
      {name: "", value: ""},
      {name: "", value: ""}
    ]
  };

  handleCBChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleVarsChange = (e) => {


    console.log("The target is: ", e.target)
    console.log("The prev state is: ", this.state.vars)
    console.log("The new state state would be : ")
    const vars = this.state.vars
    const n = e.target.id
    let thisVar = {...vars[n]}
    // modify thisVar
    thisVar[e.target.name] = e.target.value
    this.setState(
      {...this.state,
        vars: [].concat(vars.slice(0,n), [thisVar], vars.slice(n+1))
      }
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3005/code_bits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "code": {
          "collection": `${this.state.collection}`,
          "element": `${this.state.element}`,
          "block": `${this.state.block}` },
	      "vars": `${this.state.vars}`
      })
    })
    .then(resp => resp.json())
    .then(data =>
      this.setstate({
        states: data
      })
    )
  }


  render() {
    const {
      vars,
      collection,
      element,
      block,
    } = this.state

    return (
      <form onSubmit={this.handleSubmit}>

        <input type="text"
          name="name"
          id = "0"
          placeholder="variable_name"
          value={vars[0].name}
          onChange={this.handleVarsChange}
        /> =
        <input type="text"
          name="value"
          id = '0'
          placeholder="some_value"
          value={vars[0].value}
          onChange={this.handleVarsChange}
        />
      <br/>
      <br/>
        <input type="text"
          name="name"
          id = "1"
          placeholder="variable_name"
          value={vars[1].name}
          onChange={this.handleVarsChange}
        /> =
        <input type="text"
          name="value"
          id = '1'
          placeholder="some_value"
          value={vars[1].value}
          onChange={this.handleVarsChange}
        />
      <br/>
      <br/>


        <input type="text"
          name="collection"
          placeholder="collection"
          value={collection}
          onChange={this.handleCBChange}
        />
      .each do
        |<input type="text"
          name="element"
          placeholder="element"
          value={element}
          onChange={this.handleCBChange}
        />|
        <br/>
        <br/>
        <input type="text"
          name="block"
          placeholder="what should happen to every `element` in `block`?"
          value={block}
          onChange={this.handleCBChange}
        />
        <br/>
        <br/>
        end
        <br/>
        <br/>
        <input type="submit" value="Loop it!"/>

      </form>
    );
  }
}

export default CodeBitForm;
