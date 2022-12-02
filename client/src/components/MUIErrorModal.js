import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthContext from '../auth';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIErrorModal() {
    const {auth} = useContext(AuthContext)

    function gotoAuth(){
        auth.SetBack()
    }

    return (
        <Modal
          open={auth.errorMsg !== null}
          onClose={gotoAuth}
        >
          <Box sx={style}>

          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{auth.errorMsg}</Alert>
          </Stack>

          <Button id="dialog-ok-button"
            className =  "modal-button"
            onClick={gotoAuth}> OK
          </Button>

          </Box>
        </Modal>
    );
}