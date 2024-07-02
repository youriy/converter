import React from 'react';
import Container from '@mui/material/Container';
import {Currency} from "../api/Api";
import {observer} from "mobx-react-lite";
import CurrenciesStore from "../store/CurrenciesStore";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import {Item} from "./Item";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {Modal} from "./Modal";

interface Props {
    currencies: Currency[];
}

export const Wrapper = observer(({currencies}: Props) => {
    const {getAllAction, saveAction, deleteAction, defaultCurrencies} = CurrenciesStore;
    const [openDialog, setOpenDialog] = React.useState(false);

    return (
        <Container sx={{mt: 3}}>
            <Stack spacing={2} divider={<Divider/>}>
                {getAllAction().map((it, i) =>
                    <Item
                        key={it}
                        currency={currencies.find(el => el.CharCode === it) as Currency}
                        handleDelete={deleteAction}
                        defaultCurrencies={defaultCurrencies}
                    />)}
            </Stack>
            <Box sx={{mt: 4, justifyContent: 'center', display: 'flex'}}>
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    onClick={() => setOpenDialog(true)}
                >
                    <AddIcon sx={{mr: 1}}/>
                    Добавить
                </Fab>
            </Box>
            <Modal
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                currencies={currencies}
                handleSave={saveAction}
            />
        </Container>
    )
});