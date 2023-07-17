import { signOut } from 'firebase/auth'
import { auth } from '../../Config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

export const Homeprofile = () => {
    const [user] = useAuthState(auth)

    const logOut = async () => {
        await signOut(auth);

    }
    return (
        <div className='ProfileHome'>
            {user && (
                <div className="profilehome">
                    <img src={user?.photoURL || ""}></img>
                    <p>{user?.displayName}</p>
                    <button onClick={logOut}>Log Out</button>
                </div>
            )}
        </div>
    )
}