import React, { Component } from 'react';
// import './App.css';
import Animation from './components/animation';
import CodeBitForm from './components/codeBitForm.js';
import Intro from './components/intro.js';

import { Grid } from 'semantic-ui-react'



class App extends Component {
  render() {
    return (
      <div className="App">
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>

                <Intro/>
                <CodeBitForm/>

              </Grid.Column>
              <Grid.Column width={8}>

                <Animation/>


              </Grid.Column>
            </Grid.Row>
          </Grid>
      </div>
    );
  }
}







export default App
