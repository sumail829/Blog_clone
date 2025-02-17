"use client"
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';



export default function Page() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [autherEmail, setAutherEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    console.log(title, content, thumbnail)

    const createArticle = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!thumbnail) {
            return;
        }


        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("autherEmail", autherEmail);

            formData.append("thumbnail", thumbnail);



            const response = await axios.post("https://blog-backend-e5ge.onrender.com/articles", formData);//http://localhost:5000  https://blog-backend-e5ge.onrender.com
            console.log(response);
            setLoading(false);
            setTitle("");
            setContent("");
            setAutherEmail("");
            setThumbnail(null);
            toast.success("post created successfully");
             

        } catch (error) {
            console.log("Post creation wait", error)
            setLoading(false);

        }
    }
    return (
        <div>
            <form onSubmit={createArticle} action="" className=' border border-gray-800 w-4/12 mx-auto p-4'>
                <div className='flex flex-col p-4 gap-6'>
                    <input value={title}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        type="text" placeholder='Title'
                        className='border p-2' />

                    <input value={autherEmail}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setAutherEmail(e.target.value)}
                        type="text" placeholder='Author'
                        className='border p-2' />

                    <textarea value={content}
                        onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                     placeholder='Content'
                        className='border p-2' />

                    <input
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setThumbnail(e.target.files?.[0] || null)}
                        type="file" placeholder='Thumbnail'
                        className='border p-2' />

                    <button type='submit' className='border p-2 bg-blue-500'>{ loading ? "creating":"create" } </button>
                </div>

            </form>
        </div>
    )
}
