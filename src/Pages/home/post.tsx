import userEvent from '@testing-library/user-event';
import { addDoc, getDocs, collection, query, where, doc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouteId } from 'react-router/dist/lib/hooks';
import { boolean } from 'yup';
import { auth, db } from '../../Config/firebase';
import { Posts } from './Home'
import liked from './images/liked.png'
import unliked from './images/unliked.png'

interface Props {
    post: Posts;
}
interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const { post } = props;
    const [user] = useAuthState(auth);

    const [likes, setLikes] = useState<Like[] | null>(null);

    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(
            data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
        );
    };
    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id,
            });
            if (user) {
                setLikes((prev) =>
                    prev
                        ? [...prev, { userId: user.uid, likeId: newDoc.id }]
                        : [{ userId: user.uid, likeId: newDoc.id }]
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(
                likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user?.uid)
            );

            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId);
            await deleteDoc(likeToDelete);
            if (user) {
                setLikes(
                    (prev) => prev && prev.filter((like) => like.likeId !== likeId)
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

    useEffect(() => {
        getLikes();
    }, []);

    return (
        <div className='post'>
            <div className="username">
                <img className='postUserImage' src={post.userImage} />
                <p> {post.username} </p>
            </div>
            <div className='postcontent'>
                {/* <p className="posttitle posttext"> {post.tittle}</p> */}
                <p className="postdescription posttext"> {post.description} </p>
                <img className='postImage' src={post.imageLink}></img>
            </div>

            <div className="footer">

                <button className='button' onClick={hasUserLiked ? removeLike : addLike}>
                    {hasUserLiked ? <img className='buttonlike' src={liked} alt="" /> : <img className='buttonlike' src={unliked} alt="" />}
                    {likes && <p> {likes?.length} </p>}
                </button>

            </div>
        </div>
    );
};