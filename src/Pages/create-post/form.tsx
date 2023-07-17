import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../Config/firebase'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom';


interface CreateFormData {
    tittle: string;
    description: string;
}

export const CreateForm = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate();
    const schema = yup.object().shape({
        tittle: yup.string().required("You must have a tittle to post"),
        description: yup.string().required("You must have a description to post"),

    })

    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    })

    const postsref = collection(db, "posts")

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsref, {
            // tittle: data.tittle,
            // description: data.description,
            //      OR
            ...data,
            username: user?.displayName,
            userId: user?.uid
        })
        navigate("/")
    }

    return (
        <div className='formBody'>
            <form className='form' onSubmit={handleSubmit(onCreatePost)}>
                <h2>Create Post</h2>
                <input className='tittle' placeholder='Title...' {...register("tittle")} />
                <p style={{ color: "red" }}>{errors.tittle?.message}</p>
                <textarea className='description' placeholder='Description...' {...register("description")} />
                <p style={{ color: "red" }} >{errors.description?.message}</p>
                <input className='submitButton' type="submit">
                </input>
            </form>
        </div>

    )

}