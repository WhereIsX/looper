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
      this.setState({ vars }, () => console.log(this.state))
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handleChangeSubmit = (e) => {
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
	      "vars": this.state.vars
      })
    })
    .then(resp => resp.json())
    .then(data => { this.props.setInitStates(data) })
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
      <div >
      <form className={classes.container}
        onSubmit={this.handleSubmit}
        autoComplete='off'
        onChange={this.handleChange}
      >
        <TextField
          id="0"
          placeholder="variable_name"
          value={vars[0].name}
          className={classes.textField}
          margin="none"
          name = "name"
        />
        <Typography variant="subtitle1" className={classes.inLine} gutterBottom>
          =
        </Typography>
       <TextField
         id="0"
         placeholder="variable_value"
         value={vars[0].value}
         className={classes.textField}
         name = "value"

         margin="none"
       />
      <br/>
      <br/>
      <TextField
        id="1"
        placeholder="variable_name"
        value={vars[1].name}
        className={classes.textField}
        name = "name"

        margin="none"
      />
      <Typography variant="subtitle1" className={classes.inLine} gutterBottom>
        =
      </Typography>
     <TextField
       id="1"
       placeholder="variable_value"
       value={vars[1].value}
       className={classes.textField}
       name = "value"

       margin="none"
     />
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
        <br/>
      <TextField
        placeholder="block"
        name = "block"
        value={block}
        className={classes.textField}

        margin="none"

        style={{ width:420 }}
      />
      <br/>
      <br/>
      <Typography variant="subtitle1" className={classes.inLine} gutterBottom>
        end
      </Typography>
      <br/>
      <br/>
      <Button className={classes.button} variant="outlined" size="small"
        onClick={this.handleSubmit} style={{justifyContent: 'center'}}>
        Loop it!
      </Button>

      </form>
    </div>
    );
  }
}

CodeBitForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, {setInitStates})(withStyles(styles)(CodeBitForm))
