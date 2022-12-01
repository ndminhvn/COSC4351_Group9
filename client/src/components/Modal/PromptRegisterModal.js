import React, { useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const PromptRegisterModal = (props) => {
    const [open, setOpen] = useState(props.openValue);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    // Continue as guest
    const handleFirstOption = () => {
        handleClose();
    }

    // Go to login page
    const handleSecondOption = () => {
        navigate('/login');
    }
  
    return (
      <div>
        <Dialog
            open={open}
        //   onClose={handleClose}
            TransitionComponent={Transition}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className='text-center'>
            Do you want to login or register?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" className='text-center'>
              Our system shows that you are currently not logged in. Do you want to login or create a new account before making a reservation?
            </DialogContentText>
          </DialogContent>
          <DialogActions className='d-flex justify-content-around'>
            <Button onClick={handleFirstOption}>Continue as Guest</Button>
            <Button
                variant='contained' 
                onClick={handleSecondOption} 
            >
              Go to Login/Register
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
};

export default PromptRegisterModal;
