import Button from '@mui/material/Button';
import './Home.css';

const Home = () => {
    return (
        <div id='home'>
            <h1>Sample Restaurant</h1>
            <div className='h-50 d-flex flex-column align-items-center justify-content-around btn-group'>
                <Button variant='contained' href='/reserve' id='reserve-btn' className='mb-5' size='lg'>
                    Book a table now
                </Button>
                <span><p><i>Already reserved a table?</i></p>
                    <Button variant='contained' href='/detail' id='check-btn' size='lg'>
                        See your detail
                    </Button>
                </span>
            </div>
        </div>
    )
}

export default Home;