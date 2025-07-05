'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import CustomCanvasDialog from './CustomCanvasDialog'

function RecentDesign() {
    const [designList, setDesignList] = useState([]);
    return (
        <div className='mt-7'>
            <h2 className='text-3xl font-bold'>Diseños Recientes</h2>
        
            {designList.length == 0 ? (
                <div className='flex flex-col items-center gap-4 h-full mt-5'>
                    <Image src={'/edittool.png'} alt='edit' width={100} height={100} />
                    <h2>No tienes diseños recientes</h2>
                    <CustomCanvasDialog>
                        <Button> Crear nuevo diseño</Button>
                    </CustomCanvasDialog>
                    
                </div>
            ) : (
                <div>
                    {/* Add your design list content here */}
                    <p>No recent designs found</p>
                </div>
            )}
        </div>
    )
}

export default RecentDesign