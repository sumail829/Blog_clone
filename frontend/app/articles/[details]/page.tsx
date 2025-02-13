"use client";

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';


export default function Page({params}) {
    const postId=params.details;
    console.log(postId);


    const[singlePost,setSinglePost]=useState();
    console.log("this is single post",singlePost);

    const fetchArticlePost=async()=>{
        try {
            const response=await axios.get(`http://localhost:5000/articles/${postId}`)
            console.log(response.data);
            setSinglePost(response.data.article);
        } catch (error) {
            console.log("something went wromg",error);
           
            
        }
     }
    
     useEffect(()=>{
        fetchArticlePost();
     },[])
    
    return(
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Image
            src={singlePost?.thumbnail}
            alt="asd"
            height={1000}
            width={1000}
            ></Image>
            <div className="mx-72">
                {singlePost?.content}
            </div>
        </div>

    )
}