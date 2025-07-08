import React, { useState } from 'react'
import Image from 'next/image'
import { AITransformationSettings } from '@/services/Options'
import CustomImageUpload from '@/services/Sharable/CustomImageUpload'

function AiTransformSetting() {

    const [selectedAi, setSelectedAi] = useState();

    return (
        <div>
            <CustomImageUpload selectedAi={selectedAi} />
            <h2 className='my-2 font-bold'>Transformación con IA por ImageKit.io</h2>
            <div className='grid grid-cols-2 gap-3'>
                {AITransformationSettings.map((option, index) => (
                    <div key={index} onClick={() => setSelectedAi(option)}>
                       <Image src={option.image} alt={option.name}
                        width={500} height={500} 
                        className='w-full h-[70px] object-cover rounded-xl'
                       />
                       <h2 className='text-xs text-center'>{option.name}Cargar Imagen</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AiTransformSetting