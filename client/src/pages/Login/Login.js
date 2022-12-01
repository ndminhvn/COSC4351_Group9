import Form from '../../components/Forms/UserAuthForm';
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