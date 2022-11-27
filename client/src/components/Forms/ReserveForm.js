import React, { useState } from 'react';
import { 
    Box, 
    Paper,
    Stepper,
    Step,
    StepLabel,
    Typography,
    TextField, 
    Button, 
    Select,
    StepContent,
    Link,
    MenuItem,
    InputLabel, 
} from '@mui/material';
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import 'yup-phone';

import './ReserveForm.css';

const steps = [
    'Select your preferences', 
    'Enter your information', 
    'Finish the reservation'
];

const guestOptions = [1,2,3,4,5,6,7,8,9,10];

function getStepContent(step) {
    switch ( step ) {
        case 0:
            return (
                <form>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            // value={value}
                            // onChange={(newValue) => {
                            //     setValue(newValue);
                            // }}
                        />
                    </LocalizationProvider>
                    {/* <InputLabel>We are</InputLabel> */}
                    <TextField
                        className='mt-3 mb-3'
                        // id="outlined-select-currency"
                        select
                        label="We are"
                        // value={currency}
                        // onChange={handleChange}
                        helperText="Please select the number of guests"
                        >
                        {guestOptions.map((num, index) => (
                            <MenuItem key={index} value={num}>
                                {num} people
                            </MenuItem>
                        ))}
                    </TextField>
                </form>
            );
        case 1:
            break;
        case 2:
            break;
        default:
            return 'Unknown step';
    }
}

const ReserveForm = () => {

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    // const totalSteps = () => { 
    //     return steps.length;
    // };

    // const completedSteps = () => {
    //     return Object.keys(completed).length;
    // };

    // const isLastStep = () => {
    //     return activeStep === totalSteps() - 1;
    // };
    
    // const allStepsCompleted = () => {
    //     return completedSteps() === totalSteps();
    // };

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
        // password: Yup.string()
        //     .required('Password is required')
        //     .min(6, 'Password must be at least 6 characters')
        //     .max(40, 'Password must not exceed 40 characters'),
        // confirmPassword: Yup.string()
        //   .required('Confirm Password is required')
        //   .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    });

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationForm)
    });

    const onSubmit = data => {
        console.log(JSON.stringify(data, null, 2));
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
                <Step key={label} >
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                    <Typography>{getStepContent(index)}</Typography>
                        <div>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            // className={classes.button}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            // className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                        </div>
                    </StepContent>
                </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0}
                //  className={classes.resetContainer}
                >
                    <Typography>Alright! You're all set! Hope to see you soon.</Typography>
                    <Typography>
                        Want to check your details?
                        <Link href='/details'> Click here</Link>
                    </Typography>
                    <Button 
                        onClick={handleReset} 
                    //   className={classes.button}
                    >
                        Make a new Reservation
                    </Button>
                </Paper>
            )}
        </Box>
    )
}

export default ReserveForm;
