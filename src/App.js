import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Main from './pages/Main';

const App = props => {
    return (
        <MuiThemeProvider theme={switchTheme()}>
            <CssBaseline />
            <Main />
        </MuiThemeProvider>
    );
};

function switchTheme() {
    const bg = {
        typography: {
            useNextVariants: true,
        },
        palette: { type: 'dark', grey: { 100: '#424242', 200: '#424242' } },
    };
    return createMuiTheme(bg);
}

export default App;
