import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {Currency} from "../api/Api";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {grey} from '@mui/material/colors';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
    listItem: {
        cursor: 'pointer',
        ":hover": {
            backgroundColor: grey[100]
        }
    }
}

interface Props {
    open: boolean;
    handleClose: any;
    currencies: Currency[];
    handleSave: any;
}

export const Modal = ({open, handleClose, currencies, handleSave}: Props) => {

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Добавление валют</DialogTitle>
            <DialogContent>
                <List dense>
                    {currencies.map(currency =>
                        <ListItem
                            key={currency.CharCode}
                            sx={style.listItem}
                            onClick={() => handleSave(currency.CharCode)}
                        >
                            <ListItemText primary={currency.Name}/>
                        </ListItem>
                    )}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Отмена</Button>
            </DialogActions>
        </Dialog>
    );

}