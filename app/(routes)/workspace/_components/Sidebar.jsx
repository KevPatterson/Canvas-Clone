'use client'

import { WorkspaceMenu } from '@/services/Options'
import { CirclePlus } from 'lucide-react'
import React from 'react'
import { usePathname } from 'next/navigation'
import CustomCanvasDialog from './CustomCanvasDialog'

function Sidebar() {

  const path=usePathname();
  console.log(path);

  return (
    <div className='h-screen shadow-sm p-2 bg-purple'>
      <CustomCanvasDialog>
        <div className='flex items-center justify-center mb-5 hover:cursor-pointer flex-col'>
          <CirclePlus className='bg-purple-600 text-white rounded-full h-8 w-8' />
          <h2 className='text-sm text-purple-600 font-medium'>Crear</h2>
        </div>
      </CustomCanvasDialog>

      {WorkspaceMenu.map((menu,index)=>(
        <div key={index} className={`flex items-center gap-4 p-1 hover:bg-purple-100 rounded-xl flex-col mb-4
        cursor-pointer group ${menu.path == path && 'bg-purple-100'}`}>
          <menu.icon className={`group-hover:text-purple-800 ${menu.path == path && 'text-purple-800'}`} />
          <h2 className={`text-sm font-medium group-hover:text-purple-800 ${menu.path == path && 'text-purple-100'}`}>{menu.name}</h2>
        </div>
      ))}
    </div>
  )
}

export default Sidebar