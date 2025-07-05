import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UserDetailContext } from '@/context/UserDatailContext'
import { useState,useContext } from 'react'
import { toast } from 'sonner'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2Icon } from 'lucide-react'

function CustomCanvasDialog({children}) {

    const [name,setName]=useState();
    const [width,setWidth]=useState();
    const [height,setHeight]=useState();
    const {userDetail}=useContext(UserDetailContext);
    const createDesignRecord=useMutation(api.designs.CreateNewDesign);
    const [loading,setLoading]=useState(false);
    
    /**
     * Usado para crear un nuevo diseño en la base de datos
     * 
     */
    const onCreate = async (option) => {
        toast('Cargando diseño...');
        setLoading(true);
        const result=await createDesignRecord({
            name:name,
            width:Number(width),
            height:Number(height),
            uid:userDetail?._id
        });
        console.log(result);
        setLoading(false);
        //Navegar a la pagina de diseño
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Crear nuevo diseño</DialogTitle>
                <DialogDescription>
                    Proporcione el ancho y la altura del lienzo
                </DialogDescription>
                
                <div className='mt-5'>
                    <div className='mt-5'>
                        <label htmlFor="name">Nombre del diseño</label>
                        <Input className='' type='text' placeholder='Nombre del diseño' onChange={(e)=>setName(e.target.value)}/>
                        <div className=' w-full'>
                            <label htmlFor="width">Ancho</label>
                            <Input className='mt-1 ' type='number' placeholder={500} onChange={(e)=>setWidth(e.target.value)}/>
                        </div>
                        <div className=' w-full'>
                            <label htmlFor="height">Altura</label>
                            <Input className='mt-1 ' type='number' placeholder={500} onChange={(e)=>setHeight(e.target.value)}/>
                        </div>
                    </div>

                    <div className='flex justify-end mt-6'>
                    <Button className='w-full' 
                        disabled={loading || !name || !width || !height}
                        onClick={onCreate}>
                        {loading ? <Loader2Icon className='w-4 h-4 animate-spin' /> : 'Crear'}
                    </Button>
                    </div>
                </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
    }

export default CustomCanvasDialog