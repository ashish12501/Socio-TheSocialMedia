
import { auth, provider } from '../Config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const authenticate = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate('/')
    };

    return (
        <div>
            <p>Sign Up with GOOGLE to continue</p>
            <button onClick={authenticate}>SignIn with GOOGLE</button>
        </div>
    )
}