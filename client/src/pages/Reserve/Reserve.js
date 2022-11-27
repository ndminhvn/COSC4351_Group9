import ReserveForm from "../../components/Forms/ReserveForm";
import bgImage from '../../assets/loginbg.jpg';
import './Reserve.css';

function Reserve() {
  return (
    <>
      <img src={bgImage} alt='bgImage' id='loginBg' />
      <div id='reserve-page'>
        <h1>Reserve</h1>
        <p>Easy access and don't lose time waiting</p>

        <ReserveForm id='form' />
      </div>
    </>
  )
}

export default Reserve;