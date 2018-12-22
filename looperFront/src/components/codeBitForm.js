import React, { Component } from 'react'
import {connect} from 'react-redux'

// import { Button, Checkbox, Form } from 'semantic-ui-react'

class CodeBitForm extends Component {

  state = {
    varA_name: "",
    varA_value: "",
    varB_name: "",
    varB_value: "",
    collection: "",
    element: "",
    block:"",
    states: [],
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
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
	      "vars": {
		      "varA_name": `${this.state.varA_name}`,
          "varA_value": `${this.state.varA_value}`,
          "varB_name": `${this.state.varB_name}`,
          "varB_value": `${this.state.varB_value}` }
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
      varA_name, varA_value,
      varB_name, varB_value,
      collection,
      element,
      block,
    } = this.state

    return (
      <form onSubmit={this.handleSubmit}>

        <input type="text"
          name="varA_name"
          placeholder="variable_name"
          value={varA_name}
          onChange={this.handleChange}
        /> =
        <input type="text"
          name="varA_value"
          placeholder="variable_value"
          value={varA_value}
          onChange={this.handleChange}
        />
      <br/>
      <br/>
      
        <input type="text"
          name="varB_name"
          placeholder="variable_name"
          value={varB_name}
          onChange={this.handleChange}
        /> =
        <input type="text"
          name="varB_value"
          placeholder="variable_value"
          value={varB_value}
          onChange={this.handleChange}
        />
        <br/>
        <br/>

        <input type="text"
          name="collection"
          placeholder="collection"
          value={collection}
          onChange={this.handleChange}
        />
      .each do
        |<input type="text"
          name="element"
          placeholder="element"
          value={element}
          onChange={this.handleChange}
        />|
        <br/>
        <br/>
        <input type="text"
          name="block"
          placeholder="what should happen to every `element` in `block`?"
          value={block}
          onChange={this.handleChange}
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
