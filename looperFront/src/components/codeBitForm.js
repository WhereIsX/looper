import React, { Component } from 'react'
import {connect} from 'react-redux'
import {setInitStates} from '../redux/actions'
import {setError} from '../redux/actions'


// MaterialUI
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from '../styles.js'
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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


      console.log("the response is ", data);
      console.log("the status is ", data['status'])

      if (data.status === 500 || data['error(s)']) {
        console.log("you've an ERROR somewhere")
        this.props.setError(data)
      } else if (data.status === undefined) {
        console.log("nice! Ya didn't break it")
        this.props.setInitStates(data)
      }


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
      {vars.map ( (variable, index, orig_arr) => {

        if (orig_arr.length - 1 === index) {
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
                style={{ width:250 }}
                />
              <Fab size="small" color="primary" aria-label="Add" className={classes.margin} onClick={this.addVar}>
                <AddIcon />
              </Fab>
            </div>
          )
        } else {
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
                style={{ width:300 }}
                />
            </div>
          )
        }
      })}

      <br/>
      <br/>
      <TextField
        placeholder="collection"
        name = "collection"
        value={collection}
        className={classes.textField}
        multiline={true}
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
        style={{ width:422 }}
      />
      <br/>
      <br/>
      <Typography variant="subtitle1" className={classes.inLine} gutterBottom>
        end
      </Typography>
      <br/>
      <br/>
      <input type="submit" value="" />
      <br/>
      <br/>

      </form>

    );
  }
}

CodeBitForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(null, {setInitStates, setError})(withStyles(styles)(CodeBitForm))
