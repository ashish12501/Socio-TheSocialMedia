import { auth } from '../../Config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import addImg from './images/upload.png'
import { useNavigate } from 'react-router-dom'


export const HomePost = () => { // Component name should start with an uppercase letter
    const [user] = useAuthState(auth)
    const navigate = useNavigate();
    const post = () => {
        navigate("/createPost")
    }

    return (
        <div>
            <form className='formBar'>
                <img className='postBarImg' src={user?.photoURL || ""} alt="" />
                <input type="text" className='postBarCaption' placeholder="  What's on your mind ?" onChange={post} />
                <input style={{ display: "none" }} type="file" id='addPostImgBar' />
                <label className='barImgInput' htmlFor="addPostImgBar"> <img src={addImg} /> </label>
            </form>
        </div>
    )
}
