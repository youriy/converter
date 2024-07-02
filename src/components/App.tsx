import React from 'react';
import CurrencyStore from "../store/CurrencyStore";
import {observer} from "mobx-react-lite";
import {Wrapper} from "./Wrapper";
import {Currency} from "../api/Api";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const App = observer(() => {
    const {currencies, getCurrenciesAction} = CurrencyStore;

    React.useEffect(() => {
        getCurrenciesAction();
    }, []);

    if (!currencies) {
        return null;
    }

    return <>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Это конвертер валют
                </Typography>
            </Toolbar>
        </AppBar>
        {currencies.case({
            pending: () =>  <LinearProgress color="secondary" />,
            rejected: () => <div>Ошибка...</div>,
            fulfilled: () => <Wrapper currencies={currencies.value as Currency[]}/>
        })}
    </>
});

export default App;