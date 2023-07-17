import { Link } from 'react-router-dom'
import { auth } from '../Config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'

export const Navbar = () => {
    const [user] = useAuthState(auth)

    const logOut = async () => {
        await signOut(auth);
    }

    return (
        <div className='navbar'>
            <div className="list">
                <Link to="/">HOME</Link>
                {user ? <Link to="/createPost ">Create Post</Link> : <Link to="/login ">LOGIN</Link>}
            </div>


            <div className='user'>
                {
                    user && (
                        <>
                            <p>{user?.displayName}</p>
                            <img src={user?.photoURL || ""}></img>
                            <button onClick={logOut}>Log Out</button>
                        </>
                    )
                }

            </div>
        </div>

    )
}