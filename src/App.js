import React, { useState, createContext } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Main from './pages/Main';

export const ToggleContext = createContext();

const App = props => {
    const [paletteType, toggleType] = useState(true);
    return (
        <MuiThemeProvider theme={switchTheme(paletteType)}>
            <CssBaseline />
            <ToggleContext.Provider value={[paletteType, toggleType]}>
                <Main />
            </ToggleContext.Provider>
        </MuiThemeProvider>
    );
};

function switchTheme(paletteType) {
    const bg = {
        typography: {
            useNextVariants: true,
        },
    };
    if (paletteType) {
        bg.palette = { type: 'dark' };
        bg.palette.grey = { 200: '#424242' };
    }
    return createMuiTheme(bg);
}

export default App;
