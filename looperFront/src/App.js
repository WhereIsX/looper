import React, { Component } from 'react';
import './App.css';
import Animation from './components/animation';
import CodeBitForm from './components/codeBitForm.js';
import Intro from './components/intro.js';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">

          <Intro/>
          <CodeBitForm/>

          <br></br>
          <br></br>

          <Animation/>
        </div>
      </MuiThemeProvider>
    );
  }
}

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Roboto Mono',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  // typography: {
  //   useNextVariants: true,
  // },
  // palette: {
  //   type: 'dark',
  // },
});

export default App
