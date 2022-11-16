import Form from '../../components/Auth/Form';
import bgImage from '../../assets/loginbg.jpg';
import './Login.css';

const Login = () => {
    return (
      <div>
        <img src={bgImage} alt='bgImage' id='loginBg' />
        <Form />
      </div>
    )
}
  
export default Login;