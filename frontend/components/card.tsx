"use client";

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import axios from "axios";

export default function Card() {
    const [articles, setArticles] = useState([]);

    const fetchArticleData = async () => {
        try {
            console.log("Fetching articles..."); // Debug log
            const response = await axios.get("http://localhost:5000/articles");
            console.log("API Response:", response.data);
            setArticles(response.data.article);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    useEffect(() => {
        fetchArticleData();
    }, []);

    return (
        <div className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-6 my-6">
            {articles.length > 0 ? (
                articles.map((card, index) => (
                    <div key={index} className="relative flex flex-col md:flex-row my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full">
                        <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
                            <div className="relative w-full h-32 md:h-full">
                                <Image
                                    src={card.thumbnail}
                                    alt={card.title}
                                    fill
                                    className="rounded-md md:rounded-lg object-cover"
                                    priority
                                />
                            </div>
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
                            <Link href={`/articles/${card._id}`}><Button>Read more</Button></Link>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-600">Loading articles...</p>
            )}
        </div>
    );
}
