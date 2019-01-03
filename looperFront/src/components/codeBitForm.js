import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setInitStates} from '../redux/actions'

// MaterialUI
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from '../styles.js'
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


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

  handleChange = (e) => {
    if (e.target.id ){
      let vars = [...this.state.vars]
      vars[e.target.id][e.target.name] = e.target.value
      this.setState({ vars })
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('uh huh')
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
	      "vars": this.state.vars
      })
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data);

     })
  }

  addVar = (e) => {
    this.setState( (prevState) => ({
      vars: [...prevState.vars, {name:"", value:""}],
    }));
  }


  render() {
    const {
      vars,
      collection,
      element,
      block,
    } = this.state

    const { classes } = this.props;

    return (
      <form className={classes.container}
        onSubmit={this.handleSubmit}
        autoComplete='off'
        onChange={this.handleChange}
      >
      {vars.map ( (variable, index) => {
        return(
          <div key={index}>
            <TextField
              id={index}
              placeholder="variable_name"
              value={vars[index].name}
              className={classes.textField}
              name = "name"
              />
            <Typography variant="subtitle1" className={classes.inLine} gutterBottom>
              =
            </Typography>
            <TextField
              id={index}
              placeholder="variable_value"
              value={vars[index].value}
              className={classes.textField}
              name = "value"
              />
          </div>
        )
      })}
      <Button className={classes.button} variant="outlined" size="small" onClick={this.addVar}>
        Add Variable
      </Button>
      <br/>
      <br/>
      <TextField
        placeholder="collection"
        name = "collection"
        value={collection}
        className={classes.textField}
      />
      <Typography variant="subtitle1" className={classes.inLine} gutterBottom>
        .each do |
      </Typography>
      <TextField
        placeholder="element"
        name = "element"
        value={element}
        className={classes.textField}
        style={{ width:80 }}
      /> |
        <br/>
      <TextField
        placeholder="block"
        name = "block"
        value={block}
        className={classes.textField}
        margin="none"
        style={{ width:382 }}
      />
      <br/>
      <br/>
      <Typography variant="subtitle1" className={classes.inLine} gutterBottom>
        end
      </Typography>
      <br/>
      <br/>
      <input type="submit" value="Submit" />
      <br/>
      <br/>

      </form>

    );
  }
}

CodeBitForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, {setInitStates})(withStyles(styles)(CodeBitForm))
