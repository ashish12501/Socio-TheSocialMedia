import { Link } from 'react-router-dom'
import { auth } from '../Config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
// import { signOut } from 'firebase/auth'
import logo from './logo.png'

export const Navbar = () => {
    const [user] = useAuthState(auth)

    // const logOut = async () => {
    //     await signOut(auth);
    // }

    return (
        <div className='navbar'>
            <img src={logo} alt="" className="logo" />
            <div className="list">
                <Link className='navbutton' to="/">HOME</Link>
                {user ? <Link className='navbutton' to="/createPost ">Create Post</Link> : <Link className='navbutton' to="/login ">LOGIN</Link>}
            </div>


            <div className='user'>
                {
                    user && (
                        <>
                            <p>{user?.displayName}</p>
                            <img src={user?.photoURL || ""}></img>

                        </>
                    )
                }

            </div>

        </div>

    )
}