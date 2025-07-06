import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';


function SearchImage() {

    const [imageList,setImageList]=useState([]);
    const [searchInput,setSearchInput]=useState();

    useEffect(() => {
        GetImageList("Gradient");
    },[]);

    const GetImageList = async (searchInput) => {
        //https://api.unsplash.com/search/photos
        const result=await axios.get('https://api.unsplash.com/search/photos',
            {
                params:{
                    query: searchInput,
                    page: 1,
                    per_page: 20,
                },
                headers:{
                    Authorization: `Client-ID `+process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
                }
            }
        );
        setImageList(result?.data?.results);
    }

    return (
        <div className='mt-5'>
            <h2 className='text-sm font-bold'>Buscar Imagenes</h2>
            <div className='flex items-center gap-2 my-2'>
                <Input placeholder={'Montaña'} onChange={(e)=>setSearchInput(e.target.value)} />
                <Button onClick={()=>GetImageList(searchInput)}><SearchIcon/></Button>

            </div>
            <div className='mt-3 grid grid-cols-2 gap-2 overflow-auto h-[75vh]'>
                {imageList.map((image, index) => (
                    <div key={index} className='cursor-pointer'>
                        <Image src={image?.urls?.thumb} alt={image?.slug}
                            width={300} height={300}
                            className='w-full h-[80px] rounden-sm'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchImage