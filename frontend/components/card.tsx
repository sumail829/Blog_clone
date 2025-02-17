"use client";

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import axios from "axios";
import toast from 'react-hot-toast';


interface IArticle {
    _id: string;
    title: string;
    thumbnail: string;
    content: string;
    autherEmail: string;
}


export default function Card() {
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchArticleData = async () => {
        try {
            setLoading(true);
            console.log("Fetching articles...");
            const response = await axios.get("https://blog-backend-e5ge.onrender.com/articles");
            console.log("API Response:", response.data);
            setArticles(response.data.article);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching articles:", error);
            setLoading(false);
        }
    };

    const deleteArticle = async (_id: string) => {
        try {
            const response = await axios.delete(`https://blog-backend-e5ge.onrender.com/articles/${_id}`);
            toast.success("delete success")
            fetchArticleData();

        } catch (error) {
            console.log("something went wrong", error)
            toast.error("Deletion failure")

        }
    }

    useEffect(() => {
        fetchArticleData();

    }, []);

    return (
        <div className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-6 my-6">
            {loading ? <div className='space-y-6'>
                <div className='bg-slate-100  h-16 w-80'></div>
                <div className='bg-slate-100  h-16 w-80'></div>
                <div className='bg-slate-100  h-16 w-80'></div>
                <div className='bg-slate-100  h-16 w-80'></div>
                <div className='bg-slate-100  h-16 w-80'></div>
                <div className='bg-slate-100  h-16 w-80'></div>
                <div className='bg-slate-100  h-16 w-80'></div>
            </div> : <div>
                {
                    articles.map((card: IArticle, index: number) => (
                        <div key={index} className="relative flex flex-col md:flex-row my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full">
                            <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
                                <Link href={`/articles/${card._id}`} >
                                    <div className="relative w-full h-32 md:h-full">
                                        <Image
                                            src={card.thumbnail}
                                            alt={card.title}
                                            fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="rounded-md md:rounded-lg object-cover"
                                            priority
                                        />
                                    </div>
                                    </Link>
                            </div>
                            <div className="p-6">
                                <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 text-xs text-white shadow-sm w-20 text-center">
                                    STARTUP
                                </div>
                                <h4 className="mb-2 text-slate-800 text-xl font-semibold">
                                    {card.title}
                                </h4>
                                <p className="mb-8 text-slate-600 leading-normal font-light">
                                    {card.content}
                                </p>
                                <p onClick={() => deleteArticle(card._id)} className='bg-red-500 p-2 w-20'>Delete</p>
                                <Link href={`/articles/${card._id}`}><Button>Read more</Button></Link>
                            </div>
                        </div>
                    )
                    )}
            </div>
            }
        </div>
    );
}
