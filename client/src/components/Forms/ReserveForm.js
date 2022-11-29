import React, { useState } from 'react';
import { 
    Box, 
    Paper,
    Stack,
    Stepper,
    Step,
    StepLabel,
    Typography,
    TextField, 
    Button, 
    StepContent,
    Link,
    MenuItem,
    InputLabel,
    Grid
} from '@mui/material';
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import 'yup-phone';
import axios from 'axios';

import './ReserveForm.css';

const steps = [
    'Select your preferences', 
    'Enter your information', 
    'Finish the reservation'
];

const guestOptions = [1,2,3,4,5,6,7,8,9,10];

const timeOptions = [11,12,13,14,15,16,17,18,19,20];

const ReserveForm = () => {

    const [activeStep, setActiveStep] = useState(0);
    // const [completed, setCompleted] = useState({});
    
    const [inputFirstStep, setInputFirstStep] = useState({});
    const [date, setDate] = useState({});

    const handleDateBeforeSubmit = (date) => {
        return Object.keys(date).reduce((obj, k) => {
            if (['$y', '$M', '$D'].includes(k)) {
                obj[k] = date[k];
            }
            return obj;
        }, {});
    };

    const changeKeyNameInDateBeforeSubmit = (date) => {
        let newDate = {year:'', month:'', day:''}
        newDate.year = date.$y;
        newDate.month = date.$M+1;  // match with backend's logic
        newDate.day = date.$D;
        return newDate;
    };

    const handleFirstStepChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputFirstStep(values => ({...values, [name]: value}))
    };

    const handleFirstSubmit = async (event, data) => {
        event.preventDefault();
        const datePrepare = handleDateBeforeSubmit(date);
        const dateReady = changeKeyNameInDateBeforeSubmit(datePrepare);
        data = Object.assign(inputFirstStep, dateReady);
        // console.log(JSON.stringify(data, null, 2));
        await axios.post('http://localhost:8000/reservation/availability', data)
        .then(res => {
            console.log(res.data);
        }).catch(error => {
            console.error(error);
            alert('Something went wrong. Please try again.');
        })
        handleNext();
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
      
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
      
    const handleReset = () => {
        setActiveStep(0);
    };

    const validationForm = Yup.object().shape({
        firstName: Yup.string()
            .required('Please, we need your first name')
            .min(1, 'First name must be at least 1 characters')
            .max(20, 'Your first name is that long? Can we have the shorter one?'),
        lastName: Yup.string()
            .required('Also your last name!')
            .min(1, 'First name must be at least 1 characters')
            .max(20, 'Your last name is that long? Can we have the shorter one?'),
        email: Yup.string()
            .required('Can we have your email?')
            .email('Email is invalid'),
    });

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationForm)
    });

    const onSubmit = data => {
        console.log(JSON.stringify(data, null, 2));
    };

    return (
        <Box sx={{ width: '100%', padding: '0px 50px' }}>
            <Stepper activeStep={activeStep} orientation='vertical'>
            	<Step key={1}>
                    <StepLabel><b>Select your preferences</b></StepLabel>
                    <StepContent>
                        <Box sx={{ width: '20%' }} style={{ margin: 'auto 40%' }}>
                            <form onSubmit={handleFirstSubmit}>
                                <Stack spacing={2}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label='Select date'
                                            name='date'
                                            disablePast={true}
                                            value={date}
                                            onChange={(newDate) => {
                                                setDate(newDate);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <TextField
                                        className='mt-3'
                                        required
                                        select
                                        label='Select time'
                                        name='hour'
                                        defaultValue=''
                                        value={inputFirstStep.hour || ''}
                                        onChange={handleFirstStepChange}
                                    >
                                        {timeOptions.map((time, index) => (
                                            <MenuItem key={index} value={time}>
                                                {time}:00
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        className='mt-3 mb-3'
                                        required
                                        select
                                        label='We have'
                                        defaultValue=''
                                        name='partySize'
                                        value={inputFirstStep.partySize || ''}
                                        onChange={handleFirstStepChange}
                                    >
                                        {guestOptions.map((num, index) => (
                                            <MenuItem key={index} value={num}>
                                                {(num === 1) ? `${num} person` : `${num} people` }
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Stack>
                                <div className='mt-3 d-flex justify-content-around'>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type='submit'
                                        variant="contained"
                                        color="primary"
                                        // onClick={handleNext}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </form>
                        </Box>
                    </StepContent>
                </Step>
            	<Step key={2}>
                    <StepLabel><b>Checking available tables</b></StepLabel>
                    <StepContent>
                        <Typography>
                            {/* <Box sx={{ width: '50%' }}>
                                <Stack spacing={2}>
                                    <div>First Name</div>
                                    <div>Last Name</div>
                                    <div>Phone Number</div>
                                    <div>Credit Card</div>
                                </Stack>
                            </Box> */}
                        </Typography>
                        <div className='mt-3'>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </StepContent>
                </Step>
            	<Step key={3}>
                    <StepLabel><b>Finish your reservation</b></StepLabel>
                    <StepContent>
                    <Typography>
                            <Box sx={{ width: '50%' }}>
                                <Stack spacing={2}>
                                    <div>First Name</div>
                                    <div>Last Name</div>
                                    <div>Phone Number</div>
                                    <div>Credit Card</div>
                                </Stack>
                            </Box>
                        </Typography>
                        <div className='mt-3'>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </StepContent>
                </Step>
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0}>
                    <Button 
                        onClick={handleReset} 
                    >
                        Make a new Reservation
                    </Button>
                </Paper>
            )}
        </Box>
    )
}

export default ReserveForm;
