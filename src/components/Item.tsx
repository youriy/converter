import React from 'react';
import {Currency} from "../api/Api";
import ItemStore from "../store/ItemStore";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {observer, useLocalObservable} from "mobx-react-lite";
import {currencyFormat} from "../core/Helper";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {grey} from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

const style = {
    result: {
        height: 56,
        pl: 2,
        pr: 2,
        backgroundColor: grey[300],
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
    },
    num: {
        width: '100%'
    },
    subTitle: {
        position: 'absolute',
        top: 0
    }
}

interface Props {
    currency: Currency;
    handleDelete: any;
    defaultCurrencies: string[];
}

export const Item = observer(({currency, handleDelete, defaultCurrencies}: Props) => {
    const {num, result, actionCalculation} = useLocalObservable(() => new ItemStore(currency));

    if (!currency) {
        return null;
    }

    return (
        <Box>
            <Grid container spacing={2} columns={{xs: 6, sm: 12}}>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        label={'Рубль'}
                        onChange={e => actionCalculation(Number(e.target.value))}
                        type="number"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <Paper
                        elevation={0}
                        sx={style.result}
                    >
                        <Typography sx={style.subTitle} variant="caption" display="block" fontSize={12}>
                            {currency.Name}
                        </Typography>
                        <Typography
                            variant="body1"
                            fontWeight={600}
                            overflow="hidden"
                            maxWidth="92%"
                        >
                            {num > 0 && currencyFormat(result, currency.CharCode)}
                        </Typography>
                        <Typography sx={style.subTitle} variant="caption" display="block" fontSize={12}>
                            {currency.Name}
                        </Typography>
                        {!defaultCurrencies.includes(currency.CharCode) &&
                            <Tooltip title="Удалить валюту" placement="right">
                                <IconButton
                                    aria-label="delete"
                                    size="small"
                                    onClick={() => handleDelete(currency.CharCode)}
                                >
                                    <DeleteIcon fontSize="inherit"/>
                                </IconButton>
                            </Tooltip>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
});