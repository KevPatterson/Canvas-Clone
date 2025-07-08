import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCanvasHook } from '@/context/CanvasContext';
import { FabricImage } from 'fabric';

function SearchImage() {

    const [imageList,setImageList]=useState([]);
    const [searchInput,setSearchInput]=useState('');
    const [loading,setLoading]=useState(false);
    const {canvasEditor}=useCanvasHook();

    useEffect(() => {
        GetImageList("Gradient");
    },[]);

    // Búsqueda en tiempo real con debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchInput.trim()) {
                GetImageList(searchInput);
            }
        }, 500); // Espera 500ms después de que el usuario deje de escribir

        return () => clearTimeout(timeoutId);
    }, [searchInput]);

    const GetImageList = async (searchInput) => {
        setLoading(true);
        try {
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
        } catch (error) {
            console.error('Error al buscar imágenes:', error);
        } finally {
            setLoading(false);
        }
    }

    /**
     * 
     * Para agregar imagenes al Canvas
     */

    const AddImageToCanvas = async (imageUrl) => {
        const canvasImageRef=await FabricImage.fromURL(
            imageUrl
        );
        canvasEditor.add(canvasImageRef);
        canvasEditor.renderAll();

        setLoading(false);
    }

    return (
        <div className='mt-5'> 
            <h2 className='text-sm font-bold'>Buscar Imagenes</h2>
            <div className='flex items-center gap-2 my-2'>
                <Input 
                    placeholder={'Montaña'} 
                    value={searchInput}
                    onChange={(e)=>setSearchInput(e.target.value)} 
                />
                <Button onClick={()=>GetImageList(searchInput)} disabled={loading}>
                    <SearchIcon/>
                </Button>
            </div>
            {loading && (
                <div className='text-center py-4'>
                    <p className='text-sm text-gray-500'>Buscando imágenes...</p>
                </div>
            )}
            <div className='mt-3 grid grid-cols-2 gap-2 overflow-auto h-[75vh]'>
                {imageList.map((image, index) => (
                    <div key={index} onClick={()=>AddImageToCanvas(image?.urls?.regular)}
                    className='cursor-pointer'>
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