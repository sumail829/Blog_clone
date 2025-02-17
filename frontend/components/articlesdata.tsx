"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'


interface IArticle {
    thumbnail: string;
    content: string;
}
export default function Articlesdata({ id }: { id: string | number }) {
    console.log(id, "this is id in child section")
    const [singlePost, setSinglePost] = useState<IArticle | null>(null);
    console.log("this is single post", singlePost);


    const fetchArticlePost = async () => {
        try {
            const response = await axios.get(`https://blog-backend-e5ge.onrender.com/articles/${id}`)
            console.log(response.data);
            setSinglePost(response.data.article);
        } catch (error) {
            console.log("something went wromg", error);


        }
    }

    useEffect(() => {

        const fetchArticlePost = async () => {
            try {
                const response = await axios.get(`https://blog-backend-e5ge.onrender.com/articles/${id}`)
                console.log(response.data);
                setSinglePost(response.data.article);
            } catch (error) {
                console.log("something went wromg", error);


            }
        }

        fetchArticlePost();

    }, [id]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {singlePost && (
                <Image
                    src={singlePost.thumbnail}
                    alt="Article Image"
                    height={1000}
                    width={1000}
                    priority
                />
            )}

            <div className="mx-72">
                {singlePost?.content}
            </div>

        </div>
    )
}
