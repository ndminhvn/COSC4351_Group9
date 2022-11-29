import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

import bgVideo from '../../assets/videobg.mp4';
import './Home.css';

const Home = () => {
    return (
        <>
        <video autoPlay muted loop id='bgVideo'>
            <source src={bgVideo} type='video/mp4' />
        </video>
        <div id='home'>
            <div className='text-center'>
                <Divider id='divider' style={{ marginLeft:'29%', width:'600px' }} variant='dynamic' component="div" role="presentation">
                    <Typography color={'whitesmoke'} letterSpacing='0.25rem' variant="h5">WE ARE</Typography>
                </Divider>
                <h1>Team 9 Kitchen</h1>
            </div>
            <div className='h-50 d-flex flex-column align-items-center justify-content-around btn-group'>
                <Button variant='contained' href='/reserve' id='reserve-btn' className='mb-5' size='lg'>
                    Book a table now
                    <ArrowForwardIcon id='arrow-icon' sx={{ mr: 1 }} />
                </Button>
                {/* <span><p><i>Already reserved a table?</i></p>
                    <Button variant='contained' href='/detail' id='check-btn' size='lg'>
                        See your detail
                    </Button>
                </span> */}
            </div>
        </div>
        </>
    )
}

export default Home;