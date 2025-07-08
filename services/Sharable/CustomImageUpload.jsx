import { ImageUp } from 'lucide-react'
import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ImageKit from "imagekit";
import { FabricImage } from 'fabric';
import { Loader } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'

function CustomImageUpload() {

    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);
    const {designId}=useParams();
    const {canvasEditor}=useCanvasHook();

    var imagekit = new ImageKit({
        publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        privateKey : process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
        urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
    });
    
    const onImageUpload = async (event) => {
        setLoading(true);
        const file = event.target.files[0];
        const imageRef = await imagekit.upload({
            file: file,
            fileName: designId + ".png",
            isPublished: true
        });
        console.log(imageRef?.url);
        // const imageUrl = URL.createObjectURL(file);
        setImage(imageRef?.url);
        
        setLoading(false);
    }

    const onAddToCanvas = async () => {
        const canvasImageRef = await FabricImage.fromURL(
            image
        );
       
        canvasEditor.add(canvasImageRef);
    }
   
    return (
        <div>
            {!image?
                <label htmlFor='uploadImage' className='bg-secondary p-4 flex flex-col items-center justify-center rounded-xl h-[100px] mb-4 cursor-pointer'>
                    <ImageUp />
                    <h2 className='text-xs'>Cargar Imagen</h2>
                </label> :
                <label htmlFor='uploadImage' className=''>
                    <Image src={image} alt="Image" width={300} height={300} 
                    className='w-full h-[150px] object-cover rounded-lg'/>
                </label>
            }
            <input type='file' id='uploadImage' className='hidden' 
            onChange={onImageUpload}
            />

            {image && <Button className='w-full my-2' 
                onClick = {onAddToCanvas} size='sm'
                disabled = {loading}>
                {loading && <Loader className='animate-spin' /> }Agregar al Canvas
            </Button>}
        </div>
    )
}

export default CustomImageUpload