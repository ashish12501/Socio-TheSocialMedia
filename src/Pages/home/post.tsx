import userEvent from '@testing-library/user-event';
import { addDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouteId } from 'react-router/dist/lib/hooks';
import { boolean } from 'yup';
import { auth, db } from '../../Config/firebase';
import { Posts } from './Home'
interface Props {
    post: Posts,
}

interface Like {
    // likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth)
    const [likes, setLikes] = useState<Like[] | null>(null)
    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(
            data.docs.map((doc) => ({ userId: doc.data().userId }))
        );
    };
    const addLike = async () => {
        await addDoc(likesRef, {
            userId: user?.uid,
            postId: post.id
        })
    }

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
    // console.log(likes?.find((like) => like.userId === user?.uid))
    useEffect(() => {
        getLikes()
    }, [])
    return (
        <div className="postBody" >
            <p className="puser">@{post.username}</p>
            <p className="ptittle">{post.tittle}</p>
            <p className="pdescription">{post.description}</p>
            <button onClick={addLike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</>} </button>
            {likes && <p>Likes:{likes?.length}</p>}

        </div>
    )
}
