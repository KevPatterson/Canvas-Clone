import React, { useState, } from 'react'
import ImageKit from "imagekit";
import { useParams } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { FabricImage } from 'fabric';
import { useCanvasHook } from '@/context/CanvasContext';
import { Loader2Icon } from 'lucide-react';

function UploadImage() {

    const {designId}=useParams();
    const [loading,setLoading]=useState(false);
    const {canvasEditor}=useCanvasHook();

    var imagekit = new ImageKit({
        publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        privateKey : process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
        urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
    });

    const onFileUpload= async (event) => {
        setLoading(true);
        const file = event.target.files[0];
        const imageRef = await imagekit.upload({
            file: file,
            fileName: designId + ".png",
            isPublished: true
        });
        console.log(imageRef?.url);

        const canvasImageRef=await FabricImage.fromURL(
            imageRef?.url
        );
       
        canvasEditor.add(canvasImageRef);
        // canvasEditor.renderAll();

        setLoading(false);
    }
    return (
        <div>
            <label htmlFor="uploadImage" className='cursor-pointer'>
                <h2 className='text-sm text-center p-2 bg-primary text-white rounded-md font-medium'>
                    {loading ? <Loader2Icon className='animate-spin'/>:'Cargar Imagen'}
                </h2>
            <input 
                type="file" 
                id="uploadImage" 
                className='hidden'
                multiple={false}
                onChange={onFileUpload}
            />
            </label>
           
        </div>
    )
}

export default UploadImage