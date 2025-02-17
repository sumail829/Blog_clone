

import Articlesdata from '@/components/articlesdata';

interface pageProps{
    params:Promise<{
        details:string
    }>
}

export default async function Page({params}:pageProps) {
   const {details}= await params;
   console.log(details,"this is id")
    
    return(
        <div >
            <Articlesdata id={details}></Articlesdata>
        </div>

    )
}