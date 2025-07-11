import { UserButton } from '@stackframe/stack'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Download, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCanvasHook } from '@/context/CanvasContext';
import { useParams } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import ImageKit from 'imagekit';

function DesignHeader({DesignInfo, setDesignInfo}) {

    const {canvasEditor} = useCanvasHook();
    const SaveDesign = useMutation(api.designs.SaveDesign);
    const {designId} = useParams();

    var imagekit = new ImageKit({
      publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey : process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
      urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
  });

    /**
     * Para salvar el diseño en un JSON en la base de datos
     */

    const onSave = async () => {
      if (canvasEditor) {
        const base64Image = canvasEditor?.toDataURL({
          format: 'png',
          quality: 0.5,
        });

      //Obtener Lista de Archivos
      const existingFiles = await imagekit.listFiles({
        searchQuery: `name="${designId}.png"`
      });

      //Eliminar Archivo Existente
      if (existingFiles && existingFiles.length > 0) {
        await imagekit.deleteFile(existingFiles[0].fileId);
      }

      const imageRef = await imagekit.upload({
        file: base64Image,
        fileName: designId + ".png",
        isPublished: true,
        useUniqueFileName: false,
      });

      const JsonDesign = canvasEditor.toJSON();
      const result = await SaveDesign({
        id: designId,
        jsonDesign: JsonDesign,
        imagePreview: imageRef.url //ImageKit URL
      });
      // Actualizar DesignInfo localmente para evitar que el canvas se borre
      if (setDesignInfo) {
        setDesignInfo((prev) => prev ? { ...prev, jsonTemplate: JsonDesign } : prev);
      }
      console.log(result);
      toast('Diseño guardado correctamente');
      }      
    }

    const onExport = async () => {
      if (!canvasEditor) return;
      //Base64 Image
      const dataUrl = canvasEditor?.toDataURL({
        format: 'png',
        quality: 1,
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${designName}.png`;
      link.click();
    }
    
    const [designName, setDesignName] = useState('');

    useEffect(() => {
      if (DesignInfo?.name) {
        setDesignName(DesignInfo.name);
      }
    }, [DesignInfo?.name]);

    const handleNameChange = (e) => {
      setDesignName(e.target.value);
      // TODO: Add mutation to update design name in database
    };

    return (
      <div className='flex justify-between p-3 bg-gradient-to-r w-full from-sky-500 via-blue-400 to-purple-600'>
          <Image src='/logo.png' alt='logo' width={100} height={60} />
          <input 
            type="text" 
            placeholder='Nombre del diseño' 
            className='text-white border-none outline-none bg-transparent' 
            value={designName} 
            onChange={handleNameChange}
          />
          <div className='flex items-center gap-5'>
            <Button className='cursor-pointer' onClick={onSave}> <Save /> Save</Button>
            <Button className='cursor-pointer' onClick={()=>onExport()}> <Download /> Exportar </Button>
            <UserButton />
          </div>

      </div>
    )
}

export default DesignHeader