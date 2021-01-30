import React from 'react';

import {
  unstable_createMuiStrictModeTheme
} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles'
import { connect } from 'react-redux';
import { toggleDarkMode } from '../actions/styles'

function StylesContext(props) {

  const muiLightTheme = unstable_createMuiStrictModeTheme({
    palette: {
      type: "light",
      primary: {
        main: "#5F00D8",
      },
      secondary: {
        main: "#9782a8",
      },
      navText: {
        main: "#ffffff"
      },
      navBackground: {
        main: "#5F00D8"
      },
      yellow: {
        main: "#cfc50a"
      },
      border: {
        main: "#bbbbbb"
      },
    },
    feedWidth: "500px",
    spacing: 4,
    fontFamily: [
      'Chilanka',
      'cursive',
    ].join(','),
  });

  const muiDarkTheme = unstable_createMuiStrictModeTheme({
    palette: {
      type: "dark",
      primary: {
        dark: "#5F00D8",
        main: "#8888ff",
      },
      secondary: {
        main: "#9782a8",
      },
      navText: {
        main: "#ffffff"
      },
      yellow: {
        main: "#cfc50a"
      },
      navBackground: {
        main: "#191919"
      },
      border: {
        main: "#bbbbbb"
      },

    },
    feedWidth: "500px",
    spacing: 4,
    fontFamily: [
      'Chilanka',
      'cursive',
    ].join(','),
  });

  const theme = props.darkMode ? muiLightTheme : muiDarkTheme;

  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}

const mapStateToProps = (state) => {
  return ({ darkMode: state.stylesReducer.darkMode })
}

const mapDispatchToProps = { toggleDarkMode };

export default connect(mapStateToProps, mapDispatchToProps)(StylesContext);