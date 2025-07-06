'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import { canvasSizeOptions } from '@/services/Options'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { UserDetailContext } from '@/context/UserDatailContext'
import { useRouter } from 'next/navigation'

function IntroOptions() {

    const createDesignRecord=useMutation(api.designs.CreateNewDesign);
    const {userDetail}=useContext(UserDetailContext);
    const router=useRouter();

    /**
     * Usado para crear un nuevo diseño en la base de datos
     * @param {*} option 
     */
    const OnCanvasOptionsSelect = async (option) => {
        toast('Cargando diseño...');
        const result=await createDesignRecord({
            name:option.name,
            width:option.width,
            height:option.height,
            uid:userDetail?._id
        });
        console.log(result);

        //Navegar a la pagina de diseño
        router.push('/design/' + result);
    }

    return (
        <div className="space-y-8">
            {/* Banner Section */}
            <div className='relative overflow-hidden rounded-3xl shadow-2xl'>
                <Image 
                    src={'/banner-home.png'} 
                    alt='banner' 
                    width={10} 
                    height={1000}
                    className='w-full h-[220px] object-cover' 
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <h2 className='text-4xl absolute text-white font-bold bottom-6 left-8 drop-shadow-lg'>
                    Workspace
                </h2>
            </div>

            {/* Canvas Size Options */}
            <div className='space-y-6'>
                <h3 className='text-xl font-semibold text-gray-800 text-center'>
                    Choose your canvas size
                </h3>
                <div className='flex flex-row items-center justify-center gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-200 py-2 px-1 w-full'>
                    {canvasSizeOptions.map((option, index) => (
                        <div 
                            key={index} 
                            className='group flex flex-col items-center cursor-pointer p-4 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-transparent hover:border-purple-200 min-w-[120px]'
                            onClick={()=>OnCanvasOptionsSelect(option)}
                        >
                            <div className='relative mb-3'>
                                <Image 
                                    src={option.icon} 
                                    alt={option.name} 
                                    width={70} 
                                    height={70} 
                                    className='group-hover:scale-110 transition-transform duration-300 bg-white rounded-2xl p-3 shadow-md group-hover:shadow-lg' 
                                />
                            </div>
                            <h2 className='text-sm font-medium text-gray-700 text-center group-hover:text-purple-700 transition-colors'>
                                {option.name}
                            </h2>
                            <p className='text-xs text-gray-500 mt-1 text-center'>
                                {option.width} × {option.height}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
    }

export default IntroOptions