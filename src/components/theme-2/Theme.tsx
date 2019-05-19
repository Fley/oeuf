import React, { FC } from 'react';
import 'typeface-poppins';
import { MuiThemeProvider, createMuiTheme, Theme as MuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import {
  pink,
  red,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  green,
  cyan,
  teal,
  lightGreen,
  lime,
  brown,
  deepOrange,
  grey
} from '@material-ui/core/colors';

const avatarColors = [
  red[400],
  pink[300],
  purple[300],
  deepPurple[300],
  indigo[300],
  blue[500],
  lightBlue[600],
  cyan[700],
  teal[400],
  green[600],
  lightGreen[700],
  lime[900],
  brown[300]
];

export const getColorFromString = (key: string) => avatarColors[key.charCodeAt(0) % avatarColors.length];

const theme: MuiTheme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: {
      main: '#2196f3'
    },
    background: {
      default: grey[100]
    }
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif'
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 'none'
      }
    }
  }
});

export const Theme: FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </MuiThemeProvider>
);
