"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function Articlesdata({id}) {
    console.log(id,"this is id in child section")
    const[singlePost,setSinglePost]=useState({});
    console.log("this is single post",singlePost);


    const fetchArticlePost=async()=>{
        try {
            const response=await axios.get(`https://blog-backend-e5ge.onrender.com/articles/${id}`)
            console.log(response.data);
            setSinglePost(response.data.article);
        } catch (error) {
            console.log("something went wromg",error);
           
            
        }
     }

      useEffect(()=>{
             fetchArticlePost();
          },[id])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
           <Image
            src={singlePost?.thumbnail}
            alt="asd"
            height={1000}
            width={1000}
            priority
            ></Image>
            <div className="mx-72">
                {singlePost?.content}
            </div>

    </div>
  )
}
