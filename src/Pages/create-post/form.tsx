import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../Config/firebase'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { v4 } from 'uuid';
import { storage } from '../../Config/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import uploadimg from './upload.png'


interface CreateFormData {
    tittle: string;
    description: string;
    imageLink?: string;
}

export const CreateForm = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate();
    const [postImage, setPostImage] = useState<File | null>(null);
    const schema = yup.object().shape({
        tittle: yup.string().required("You must have a tittle to post"),
        description: yup.string().required("You must have a description to post"),
        // imageLink: yup.string().required()
    })

    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    })

    const postsref = collection(db, "posts")

    const onCreatePost = async (data: CreateFormData) => {
        if (postImage == null) return 0;
        const imageId = v4();
        const imageRef = ref(storage, `images/${postImage.name}_${imageId}`); // Append the ID to the file name
        const postsref = collection(db, "posts")
        uploadBytes(imageRef, postImage).then(() => {
            getDownloadURL(imageRef)
                .then((downloadURL) => {
                    console.log(downloadURL)
                    addDoc(postsref, {
                        // tittle: data.tittle,
                        // description: data.description,
                        //      OR
                        ...data,
                        username: user?.displayName,
                        userId: user?.uid,
                        imageLink: downloadURL
                    })
                    navigate("/")
                })
        })

    }

    return (
        <div className='formBody'>
            <form className='form' onSubmit={handleSubmit(onCreatePost)}>
                <h2>Create Post</h2>
                <input className='tittle' placeholder='Title...' {...register("tittle")} />
                <p style={{ color: "red" }}>{errors.tittle?.message}</p>
                <textarea className='description' placeholder='Description...' {...register("description")} />
                <p style={{ color: "red" }} >{errors.description?.message}</p>
                <input style={{ display: "none" }} className='imageUpload' id='file' type="file" onChange={(event) => (setPostImage(event.target.files && event.target.files[0]))} />
                <label className='postlabel' htmlFor="file">

                    {postImage == null ? <img src={uploadimg} alt="" /> : ""}
                    <span>{postImage ? "Image Selected" : "Choose Image"}</span>
                </label>
                <input className='submitButton' type="submit">
                </input>
            </form>
        </div>

    )

}