import React from 'react'
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material'

export default function Confirm(props) {
    const { open, title, onClose, onConfirm } = props;
    return (
        <Dialog
            open={open}
            onClose={() => onClose()} 
        >
            <DialogTitle fontSize='15px'>{title || "Tem certeza que deseja excluir?"}</DialogTitle>
            <DialogActions    style={{ alignSelf: 'center' }} >
                <Button onClick={() => onClose()} color='error'>
                    Não
                </Button>
                <Button
                    onClick={() => {                      
                        onConfirm();
                    }}
                    variant='contained'
                    color='primary'
                    size='small'                 
                >
                    Sim
                </Button>
            </DialogActions>
            {/* <Confirm
    open={true}
    onClose={() => alert('close')}
    onConfirm = {()=> alert('confirma')}
    /> */}
        </Dialog>
    )
}
