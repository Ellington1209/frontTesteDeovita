import React from 'react'
import { changeNotify } from '../../store/actions/notify.actions';
import { Snackbar, SnackbarContent } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { green, red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';


export default function Notify() {
    const dispatch = useDispatch();
    const notify = useSelector(state => state.notifyReducer);
    const classes =  createUseStyles({
        success:{
            backgroundColor: green[500]
        },
        error: {
            backgroundColor: red[600]
        }
    })();

    return (
        <Snackbar
            anchorOrigin={{
                horizontal: "center",
                vertical: notify.vertical            
            }}
            open={notify.open}
            autoHideDuration={notify.time}
            onClose={() => dispatch( changeNotify({open: false}))}
        >
            <SnackbarContent
                className={`${classes[notify.class]} d-flex justify-content-center`}
                message={
                    <span className='d-flex align-items-center'>{notify.msg}</span>
                }
            />
        </Snackbar>

    )
}