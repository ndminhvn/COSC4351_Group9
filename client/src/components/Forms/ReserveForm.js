import React, { useState } from 'react';
import { 
    Box, 
    Stack,
    Stepper,
    Step,
    StepLabel,
    TextField, 
    Button, 
    StepContent,
    MenuItem,
    Grid,
    Typography
} from '@mui/material';
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';

import { getToken } from '../../useToken.js';
import { TableCap2, TableCap4, TableCap6 } from '../TableImages';

import './ReserveForm.css';

const steps = [
    'Select your preferences', 
    'Enter your information', 
    'Finish the reservation'
];

const guestOptions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

const hourOptions = [10,11,12,13,14,15,16,17,18,19,20];

const getCurrentHour = () => {
    let today = new Date();
    return today.getHours();
}

const getCurrentDate = () => {
    let today = new Date();
    return `${today.getFullYear()}${today.getMonth()}${today.getDate()}`;
}

// render tables in step 2
const tableRender = (capacity, name, index) => {
    if (capacity === 2) {
        return (
            <div key={index}>
                <img 
                    src={TableCap2}
                    alt='tableImg'
                    style={{height: '150px', width: 'auto'}}
                />
                <p className='text-center'>{name}</p>
            </div>
        )
    }
    if (capacity === 4) {
        return (
            <div key={index}>
                <img 
                    src={TableCap4}
                    alt='tableImg'
                    style={{height: '150px', width: 'auto'}}
                />
                <p className='text-center'>{name}</p>
            </div>
        )
    }
    if (capacity === 6) {
        return (
            <div key={index}>
                <img 
                    src={TableCap6}
                    alt='tableImg'
                    style={{height: '150px', width: 'auto'}}
                />
                <p className='text-center'>{name}</p>
            </div>
        )
    }
}

const ReserveForm = () => {
    const token = getToken();
    const [userData, setUserData] = useState({});
    const [userCard, setUserCard] = useState({});

    const [activeStep, setActiveStep] = useState(0);
    
    const [inputFirstStep, setInputFirstStep] = useState({});   // contain time and num of guests from input
    const [inputLastStep, setInputLastStep] = useState({});     // input last step

    const [date, setDate] = useState({});                       // date value from date picker
    const [phoneNumber, setPhoneNumber] = useState();         // phone number from input

    const [tableList, setTableList] = useState([]);             // available tables list from api

    const [confirmApiResponse, setConfirmApiResponse] = useState(); // confirm api response-used to display message to user

    // step button functions
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
      
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
      
    const handleReset = () => {
        setActiveStep(0);
    };

    // filter out only necessary fields from date
    const handleDateBeforeSubmit = (date) => {
        return Object.keys(date).reduce((obj, k) => {
            if (['$y', '$M', '$D'].includes(k)) {
                obj[k] = date[k];
            }
            return obj;
        }, {});
    };

    // modify key fields in date for api
    const changeKeyNameInDateBeforeSubmit = (date) => {
        let newDate = {year:'', month:'', day:''}
        newDate.year = `${date.$y}`;
        newDate.month = `${date.$M+1}`;  // match with backend's logic
        newDate.day = `${date.$D}`;
        return newDate;
    };
    
    // keep track of time and num of guest from input
    const handleFirstStepChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputFirstStep(values => ({...values, [name]: value}))
    };
    
    // keep track of last step's input
    const handleLastStepChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputLastStep(values => ({...values, [name]: value}))
    };

    // handle first step form submit: check table availability
    const handleFirstSubmit = async (event, data) => {
        event.preventDefault();
        const datePrepare = handleDateBeforeSubmit(date);
        const dateReady = changeKeyNameInDateBeforeSubmit(datePrepare);
        data = Object.assign(inputFirstStep, dateReady);
        // console.log(JSON.stringify(data, null, 2));
        await axios.post('http://localhost:8000/reservation/availability', data)
        .then(res => {
            // console.log(res.data);
            // save res.data to tableList
            setTableList(res.data);
            // go to next step
            handleNext();
        }).catch(error => {
            console.error(error);
            alert('Something went wrong. Please try again.');
        })
    };

    // get user data if logged in
    const getUserData = async () => {
        await axios.get(`http://localhost:8000/user/details/${token}`)
        .then(res => {
          // console.log(res.data);
          setUserData(res.data);
          setUserCard(res.data.creditCard);
          // console.log(userData);
          handleNext();
        }).catch(error => {
          console.error(error);
          alert('Something went wrong. Please try again.');
        })   
    }

    // handle second step click (after found tables)
    const handleSecondNextClick = (event) => {
        // if user logged in
        if (token) {
            event.preventDefault();
            getUserData();
        }
        else handleNext();
    };

    // handle last step form submit: confirm reservation
    const handleFinalSubmit = async (event, data) => {
        event.preventDefault();
        const datePrepare = handleDateBeforeSubmit(date);
        const dateReady = changeKeyNameInDateBeforeSubmit(datePrepare);
        data = Object.assign(inputFirstStep, dateReady);                // add fields from the first step inputs
        data = Object.assign(inputLastStep, inputFirstStep);            // add fields from 2 steps together
        data.phoneNumber = phoneNumber;                                 // add phone field
        data.table_arr = tableList;                                     // add table list
        // console.log(JSON.stringify(data, null, 2));
        // handleNext();
        await axios.post('http://localhost:8000/reservation/confirm', data)
        .then(res => {
            // console.log(res);
            setConfirmApiResponse(res.data)
            handleNext();
        })
        .catch(error => {
            console.error(error);
            alert('Something went wrong. Please try again.');
        });
    }

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
                                        {hourOptions.map((hour, index) => (
                                            <MenuItem key={index} value={`${hour}`}>
                                                {(`${date.$y}${date.$M}${date.$D}` === getCurrentDate())
                                                    ? (hour > getCurrentHour() && `${hour}:00`)
                                                    : `${hour}:00` 
                                                }
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
                                            <MenuItem key={index} value={`${num}`}>
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
                                        variant='contained'
                                        color='primary'
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
                        <Box sx={{ width: '33.3%' }} style={{ margin: 'auto 33.3%' }}>
                            {(tableList.length !== 0) ? 
                                <>
                                    <h4 className='text-center mb-3'>
                                        Here is what we found for you!
                                    </h4>
                                    <div className='mt-2 d-flex justify-content-around'>
                                        {tableList.map((table, index) => (
                                            tableRender(table.capacity, table.name, index)
                                        ))}
                                    </div>
                                    <div className='mt-3 d-flex justify-content-around'>
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            type='submit'
                                            variant='contained'
                                            color='primary'
                                            onClick={handleSecondNextClick}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </>
                            : 
                            <>
                                <h4 className='text-center'>
                                We sincerely apologize. There are no tables available that match your preferences. Please try again!
                                </h4>
                                <div className='mt-3 d-flex justify-content-around'>
                                    <Button
                                    	variant='contained'
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        disabled
                                        type='submit'
                                        variant='contained'
                                        color="primary"
                                        onClick={handleNext}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </>
                            }
                        </Box>
                    </StepContent>
                </Step>
            	<Step key={3}>
                    <StepLabel><b>Finish your reservation</b></StepLabel>
                    <StepContent>
                        <Box sx={{ width: '33.3%' }} style={{ margin: 'auto 33.3%' }}>
                            <form onSubmit={handleFinalSubmit}>
                            <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                                <Grid item xs={6}>
                                    <TextField
                                        className='mt-3'
                                        required
                                        label='First Name'
                                        name='firstName'
                                        value={inputLastStep.firstName || ((token) ? userData.firstName : '')}
                                        onChange={handleLastStepChange}
                                        // margin='normal'
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        className='mt-3'
                                        required
                                        label='Last Name'
                                        name='lastName'
                                        value={inputLastStep.lastName || ((token) ? userData.lastName : '')}
                                        onChange={handleLastStepChange}
                                        // margin='normal'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MuiTelInput 
                                        fullWidth
                                        // className='mt-3'
                                        label='Phone Number'
                                        onlyCountries={['US']}
                                        defaultCountry='US'
                                        value={(token) ? userData.phoneNumber : phoneNumber}
                                        onChange={(newValue) => {
                                            matchIsValidTel(newValue);
                                            setPhoneNumber(newValue);
                                        }}
                                        // margin='normal'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        // className='mt-3'
                                        fullWidth
                                        required
                                        // type='number'
                                        name='cardNumber'
                                        label='Credit Card Number'
                                        value={inputLastStep.cardNumber || ((token) ? userCard.cardNumber : '')}
                                        onChange={handleLastStepChange}
                                        // margin='normal'
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        // className='mt-3'
                                        fullWidth
                                        required
                                        type='number'
                                        name='expDate'
                                        label='Expired Date'
                                        value={inputLastStep.expDate || ((token) ? userCard.expDate : '')}
                                        onChange={handleLastStepChange}
                                        helperText='MMYY Format'
                                        placeholder='1111'
                                        // margin='normal'
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        // className='mt-3'
                                        fullWidth
                                        required
                                        type='number'
                                        name='cvv'
                                        label='CVV'
                                        value={inputLastStep.cvv || ((token) ? userCard.cvv : '')}
                                        onChange={handleLastStepChange}
                                        placeholder='111'
                                        // margin='normal'
                                    />
                                </Grid>
                                </Grid>
                                <div className='mt-3 d-flex justify-content-around'>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type='submit'
                                        variant='contained'
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
            </Stepper>
            {activeStep === steps.length && (
                <Box sx={{ width: '33.3%' }} style={{ margin: 'auto 33.3%' }}>
                    <div className='mt-3 d-flex justify-content-around'>
                        <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                            <Grid item xs={12}>
                                {(confirmApiResponse) && 
                                    <Typography className='text-center' variant='h5'>{confirmApiResponse}</Typography>
                                }
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant='outlined'
                                    color='primary'
                                    onClick={handleReset} 
                                >
                                    New Reservation
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button 
                                    fullWidth
                                    variant='contained' 
                                    color='primary' 
                                    // size='lg'
                                    href='/'
                                >
                                    Back to Home Page
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            )}
        </Box>
    )
}

export default ReserveForm;
