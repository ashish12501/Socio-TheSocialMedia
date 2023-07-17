
import { auth, provider } from '../Config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import Google from './google.png'

export const Login = () => {
    const navigate = useNavigate();
    const authenticate = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate('/')
    };

    return (
        <div className="loginbody">
            <div className='login'>
                <h2>Login needed to Browse !</h2>
                <p>Sign Up with GOOGLE to continue</p>
                <button onClick={authenticate}>SignIn with GOOGLE <img className='google' src={Google} alt="" /></button>
            </div>
        </div>

    )
}