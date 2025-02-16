"use client";

import Articlesdata from '@/components/articlesdata';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';


export default async function Page({params}) {
   const {details}=await params;
   console.log(details,"this is id")
    
    return(
        <div >
            <Articlesdata id={details}></Articlesdata>
        </div>

    )
}