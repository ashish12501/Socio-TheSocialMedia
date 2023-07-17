
import { db } from '../../Config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { async } from '@firebase/util';
import { Post } from './post'
import { Homeprofile } from './homeprofile'

export interface Posts {
    id: string,
    userId: string,
    tittle: string,
    description: string,
    username: string,
}

export const Home = () => {
    const [postList, setPostList] = useState<Posts[] | null>(null);

    const postsref = collection(db, "posts")

    const getPosts = async () => {
        const data = await getDocs(postsref);
        setPostList(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Posts[]
        )

        // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Posts[])
        // console.log(data.docs)

    }
    useEffect(() => {
        getPosts();
    }, [])
    return (
        <div className="home">
            <div className="homeprofile">
                <Homeprofile />
            </div>
            <div className='homeposts'>
                {postList?.map((post) => <Post post={post} />)}
            </div>
        </div>

    )
}